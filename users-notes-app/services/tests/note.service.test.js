
const NoteServices = require("../note.services");

jest.mock("../../repositories/note.repository", () => {
  return jest.fn().mockImplementation(() => ({
    create: jest.fn(),
    allNotes: jest.fn(),
    userNotes: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    search: jest.fn(),
  }));
});

jest.mock("../../repositories/user.repository", () => {
  return jest.fn().mockImplementation(() => ({
    findById: jest.fn(),
  }));
});

describe("Note Services", () => {
  let service;

  beforeEach(() => {
    service = new NoteServices();
  });

  // 1. Add Note

  test("should add a new note", async () => {
    const user = { id: 1 };

    const note = {
      id: 1,
      title: "Study",
      content: "Learn testing",
    };

    service.noteRepository.create.mockResolvedValue(note);

    const result = await service.addNote(
      "Study",
      "Learn testing",
      user
    );

    expect(result).toEqual(note);

    expect(service.noteRepository.create).toHaveBeenCalledWith(
      "Study",
      "Learn testing",
      user
    );
  });

  // 2. Get All Notes

  test("should return all notes", async () => {
    const notes = [
      { id: 1, title: "Study" },
      { id: 2, title: "Practice" },
    ];

    service.noteRepository.allNotes.mockResolvedValue(notes);

    const result = await service.getAllNotes();

    expect(result).toEqual(notes);
  });

  // 3. Get User Notes

  test("should return user and their notes", async () => {
    const user = { id: 1, username: "Menna" };
    const notes = [{ id: 1, title: "Study" }];

    service.userRepository.findById.mockResolvedValue(user);
    service.noteRepository.userNotes.mockResolvedValue(notes);

    const result = await service.getUserNotes(1);

    expect(result).toEqual({
      user,
      userNotes: notes,
    });
  });

  test("should throw error if user does not exist", async () => {
    service.userRepository.findById.mockResolvedValue(null);

    await expect(
      service.getUserNotes(99)
    ).rejects.toThrow("user not found");

    expect(service.noteRepository.userNotes).not.toHaveBeenCalled();
  });

  // 4. Delete Note

  test("should delete a note", async () => {
    const user = { id: 1, role: "student" };
    const note = { id: 1, user: { id: 1 } };

    service.noteRepository.findById.mockResolvedValue(note);
    service.noteRepository.delete.mockResolvedValue(note);

    const result = await service.deleteNote(1, user);

    expect(result).toEqual(note);

    expect(service.noteRepository.delete).toHaveBeenCalledWith(note);
  });

  test("should throw error if note does not exist", async () => {
    service.noteRepository.findById.mockResolvedValue(null);

    await expect(
      service.deleteNote(99, { id: 1, role: "student" })
    ).rejects.toThrow("note note found");

    expect(service.noteRepository.delete).not.toHaveBeenCalled();
  });

  test("should throw error if user does not own the note", async () => {
    const note = { id: 1, user: { id: 10 } };
    const user = { id: 20, role: "student" };

    service.noteRepository.findById.mockResolvedValue(note);

    await expect(
      service.deleteNote(1, user)
    ).rejects.toThrow("You don't have access to delete this note");

    expect(service.noteRepository.delete).not.toHaveBeenCalled();
  });

  test("should allow admin to delete another user's note", async () => {
    const note = { id: 1, user: { id: 10 } };
    const admin = { id: 20, role: "admin" };

    service.noteRepository.findById.mockResolvedValue(note);
    service.noteRepository.delete.mockResolvedValue(note);

    const result = await service.deleteNote(1, admin);

    expect(result).toEqual(note);
    expect(service.noteRepository.delete).toHaveBeenCalledWith(note);
  });

  // 5. Update Note

  test("should update a note", async () => {
    const user = { id: 1, role: "student" };

    const note = { id: 1, user: { id: 1 }, title: "Old title" };
    const updatedNote = {
      id: 1,
      user: { id: 1 },
      title: "New title",
    };

    service.noteRepository.findById
      .mockResolvedValueOnce(note)
      .mockResolvedValueOnce(updatedNote);

    service.noteRepository.update.mockResolvedValue(undefined);

    const result = await service.updateNote(
      1,
      { title: "New title" },
      user
    );

    expect(result).toEqual(updatedNote);

    expect(service.noteRepository.update).toHaveBeenCalledWith(
      1,
      { title: "New title" }
    );
  });

  test("should throw error if note to update does not exist", async () => {
    service.noteRepository.findById.mockResolvedValue(null);

    await expect(
      service.updateNote(
        99,
        { title: "New title" },
        { id: 1, role: "student" }
      )
    ).rejects.toThrow("note note found");

    expect(service.noteRepository.update).not.toHaveBeenCalled();
  });

  test("should throw error if user does not own the note when updating", async () => {
    const note = { id: 1, user: { id: 10 } };

    service.noteRepository.findById.mockResolvedValue(note);

    await expect(
      service.updateNote(
        1,
        { title: "New title" },
        { id: 20, role: "student" }
      )
    ).rejects.toThrow("You don't have access to update this note");

    expect(service.noteRepository.update).not.toHaveBeenCalled();
  });

  test("should allow admin to update another user's note", async () => {
    const note = { id: 1, user: { id: 10 } };

    const updatedNote = {
      id: 1,
      user: { id: 10 },
      title: "Updated",
    };

    service.noteRepository.findById
      .mockResolvedValueOnce(note)
      .mockResolvedValueOnce(updatedNote);

    service.noteRepository.update.mockResolvedValue(undefined);

    const result = await service.updateNote(
      1,
      { title: "Updated" },
      { id: 20, role: "admin" }
    );

    expect(result).toEqual(updatedNote);
  });

  // 6. Get My Notes

  test("should return my notes", async () => {
    const notes = [{ id: 1, title: "Study" }];

    service.noteRepository.userNotes.mockResolvedValue(notes);

    const result = await service.getMyNotes(1);

    expect(result).toEqual(notes);
  });

  test("should throw error if I have no notes", async () => {
    service.noteRepository.userNotes.mockResolvedValue([]);

    await expect(
      service.getMyNotes(1)
    ).rejects.toThrow("you don't have any notes");
  });

  // 7. Search Notes

  test("should return matching notes", async () => {
    const notes = [{ id: 1, title: "Study" }];

    service.noteRepository.search.mockResolvedValue(notes);

    const result = await service.searchNotes("Study");

    expect(result).toEqual(notes);
  });

  test("should throw error if no notes are found", async () => {
    service.noteRepository.search.mockResolvedValue([]);

    await expect(
      service.searchNotes("Unknown")
    ).rejects.toThrow("not found");
  });
});
