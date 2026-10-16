const AppDataSource = require("../config/db");
const { ILike } = require("typeorm");

class userRepository {
  constructor() {
    this.repository = AppDataSource.getRepository("user");
  }

  async create(username, email, hashedPassword, role) {
    const newUser = this.repository.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = this.repository.save(newUser);

    return savedUser;
  }

  async allUsers() {
    return this.repository.find({
      select: { id: true, username: true, email: true },
    });
  }

  async findById(userId) {
    return this.repository.findOne({
      where: {
        id: userId,
      },
      select: { id: true, username: true, email: true },
      relations: {
        notes: true,
      },
    });
  }

  async deleteUser(user) {
    return this.repository.delete(user);
  }

  async updateMe(me, newData) {
    return this.repository.update(me, newData);
  }

  async search(name) {
    return this.repository.find({
      where: { username: ILike(`%${name}%`) },
      select: { id: true, username: true, email: true },
    });
  }

  async findByEmail(email) {
    const user = this.repository.findOne({
      where: { email: email },
      select: { id: true, username: true, email: true, password: true },
    });

    return user;
  }
}

module.exports = userRepository;
