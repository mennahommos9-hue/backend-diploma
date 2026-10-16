const { z } = require("zod");

const addNoteSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(1),
});

const updateNoteSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(1).optional(),
});

module.exports = {
  addNoteSchema,
  updateNoteSchema,
};
