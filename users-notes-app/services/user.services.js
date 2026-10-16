const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userServices {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(username, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.create(
      username,
      email,
      hashedPassword,
      role,
    );

    return newUser;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("invalid email or password", 400);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      throw new AppError("invalid email or password", 400);
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return { user, token };
  }

  async getAllUsers() {
    return await this.userRepository.allUsers();
  }

  async getUserById(userId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("user not found", 404);
    }

    return user;
  }

  async deleteUser(userId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("user not found", 404);
    }

    await this.userRepository.deleteUser(user);

    return user;
  }

  async updateMe(me, newData) {
    await this.userRepository.updateMe(me, newData);

    const updatedMe = await this.userRepository.findById(me);

    return updatedMe;
  }

  async searchUsers(name) {
    const users = await this.userRepository.search(name);

    if (users.length === 0) {
      throw new AppError("not found", 404);
    }

    return users;
  }
}

module.exports = userServices;
