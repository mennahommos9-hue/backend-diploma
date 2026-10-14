const { EntitySchema } = require("typeorm");

const noteShema = new EntitySchema({
  name: "note",
  tableName: "notes",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    content: {
      type: "text",
    },
  },
  relations: {
    user: {
      target: "user",
      type: "many-to-one",
      inverseSide: "notes",
      JoinColumn: true,
      nullable: false,
    },
  },
});

module.exports = noteShema;
