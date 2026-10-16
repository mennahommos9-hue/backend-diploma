
const UserServices = require("../user.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Services", () => {
  let service;

  beforeEach(() => {
    service = new UserServices();

    service.userRepository.create = jest.fn();
    service.userRepository.findByEmail = jest.fn();
    service.userRepository.findById = jest.fn();
    service.userRepository.allUsers = jest.fn();
    service.userRepository.deleteUser = jest.fn();
    service.userRepository.updateMe = jest.fn();
    service.userRepository.search = jest.fn();
  });

  // 1. Register

  test("should register a new user", async () => {
    const user = {
      id: 1,
      username: "Menna",
      email: "menna@test.com",
    };

    bcrypt.hash.mockResolvedValue("hashedPassword");
    service.userRepository.create.mockResolvedValue(user);

    const result = await service.register(
      "Menna",
      "menna@test.com",
      "123456",
      "student"
    );

    expect(result).toEqual(user);

    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);

    expect(service.userRepository.create).toHaveBeenCalledWith(
      "Menna",
      "menna@test.com",
      "hashedPassword",
      "student"
    );
  });

  // 2. Login

  test("should throw error if email does not exist", async () => {
    service.userRepository.findByEmail.mockResolvedValue(null);

    await expect(
      service.login("wrong@test.com", "123456")
    ).rejects.toThrow("invalid email or password");
  });

  test("should throw error if password is incorrect", async () => {
    const user = {
      id: 1,
      email: "menna@test.com",
      password: "hashedPassword",
    };

    service.userRepository.findByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    await expect(
      service.login("menna@test.com", "wrongPassword")
    ).rejects.toThrow("invalid email or password");
  });

  test("should login successfully and return token", async () => {
    const user = {
      id: 1,
      username: "Menna",
      email: "menna@test.com",
      password: "hashedPassword",
    };

    service.userRepository.findByEmail.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken");

    const result = await service.login(
      "menna@test.com",
      "123456"
    );

    expect(result.user).toEqual(user);
    expect(result.token).toBe("fakeToken");
    expect(jwt.sign).toHaveBeenCalled();
  });

  // 3. Get All Users

  test("should return all users", async () => {
    const users = [
      { id: 1, username: "Menna" },
      { id: 2, username: "Ahmed" },
    ];

    service.userRepository.allUsers.mockResolvedValue(users);

    const result = await service.getAllUsers();

    expect(result).toEqual(users);
  });

  // 4. Get User By ID

  test("should return user if found", async () => {
    const user = { id: 1, username: "Menna" };

    service.userRepository.findById.mockResolvedValue(user);

    const result = await service.getUserById(1);

    expect(result).toEqual(user);
  });

  test("should throw error if user does not exist", async () => {
    service.userRepository.findById.mockResolvedValue(null);

    await expect(
      service.getUserById(99)
    ).rejects.toThrow("user not found");
  });

  // 5. Delete User

  test("should delete user if found", async () => {
    const user = { id: 1, username: "Menna" };

    service.userRepository.findById.mockResolvedValue(user);
    service.userRepository.deleteUser.mockResolvedValue(undefined);

    const result = await service.deleteUser(1);

    expect(service.userRepository.deleteUser).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });

  test("should throw error if user to delete does not exist", async () => {
    service.userRepository.findById.mockResolvedValue(null);

    await expect(
      service.deleteUser(99)
    ).rejects.toThrow("user not found");

    expect(service.userRepository.deleteUser).not.toHaveBeenCalled();
  });

  // 6. Update Me

  test("should update user and return updated data", async () => {
    const updatedUser = {
      id: 1,
      username: "Menna Updated",
    };

    service.userRepository.updateMe.mockResolvedValue(undefined);
    service.userRepository.findById.mockResolvedValue(updatedUser);

    const result = await service.updateMe(1, {
      username: "Menna Updated",
    });

    expect(service.userRepository.updateMe).toHaveBeenCalledWith(
      1,
      { username: "Menna Updated" }
    );

    expect(result).toEqual(updatedUser);
  });

  // 7. Search Users

  test("should return users that match the search", async () => {
    const users = [{ id: 1, username: "Menna" }];

    service.userRepository.search.mockResolvedValue(users);

    const result = await service.searchUsers("Menna");

    expect(result).toEqual(users);
  });

  test("should throw error if no users are found", async () => {
    service.userRepository.search.mockResolvedValue([]);

    await expect(
      service.searchUsers("Unknown")
    ).rejects.toThrow("not found");
  });
});
