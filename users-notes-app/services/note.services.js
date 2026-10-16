const NoteRepository = require("../repositories/note.repository");
const UserRepository = require("../repositories/user.repository");
const AppError = require("../utils/AppError");

class noteServices {
  constructor() {
    this.noteRepository = new NoteRepository();
    this.userRepository = new UserRepository();
  }

  async addNote(title, content, user) {
    const newNote = await this.noteRepository.create(title, content, user);

    return newNote;
  }

  async getAllNotes() {
    return await this.noteRepository.allNotes();
  }

  async getUserNotes(userId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("user not found", 404);
    }

    const userNotes = await this.noteRepository.userNotes(userId);

    return { user, userNotes };
  }

  async deleteNote(noteId, user) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new AppError("note note found", 404);
    }

    if (note.user.id !== user.id && user.role !== "admin") {
      throw new AppError("You don't have access to delete this note", 403);
    }

    return await this.noteRepository.delete(note);
  }

  async updateNote(id, newData, user) {
    const note = await this.noteRepository.findById(id);

    if (!note) {
      throw new AppError("note note found", 404);
    }

    if (note.user.id !== user.id && user.role !== "admin") {
      throw new AppError("You don't have access to update this note", 403);
    }

    await this.noteRepository.update(id, newData);

    const updatedNote = await this.noteRepository.findById(id);

    return updatedNote;
  }

  async getMyNotes(myId) {
    const myNotes = await this.noteRepository.userNotes(myId);

    if (myNotes.length === 0) {
      throw new AppError("you don't have any notes", 404);
    }

    return myNotes;
  }

  async searchNotes(title) {
    const notes = await this.noteRepository.search(title);

    if (notes.length === 0) {
      throw new AppError("not found", 404);
    }

    return notes;
  }
}

module.exports = noteServices;
