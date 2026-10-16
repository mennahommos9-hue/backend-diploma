const AppDataSource = require("../config/db");
const { ILike } = require("typeorm");

class noteRepository {
  constructor() {
    this.repository = AppDataSource.getRepository("note");
  }

  async create(title, content, user) {
    const newNote = this.repository.create({
      title,
      content,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
    const savedNote = this.repository.save(newNote);

    return savedNote;
  }

  async allNotes() {
    return this.repository.find();
  }

  async userNotes(userId) {
    return this.repository.find({
      where: { user: { id: userId } },
    });
  }

  async findById(noteId) {
    return this.repository.findOne({
      where: { id: noteId },
      relations: {
        user: true,
      },
    });
  }

  async delete(note) {
    return this.repository.delete(note);
  }

  async update(id, newData) {
    return this.repository.update(id, newData);
  }

  async search(title) {
    return this.repository.find({
      where: { title: ILike(`%${title}%`) },
    });
  }
}

module.exports = noteRepository;
