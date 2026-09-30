const fs = require("fs");

const users = JSON.parse(fs.readFileSync("db/users.json", "utf-8"));

const checkUserById = (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  return { user, id };
};

const writeFile = (data) => {
  fs.writeFileSync("db/users.json", JSON.stringify(data, null, 2), "utf-8");
};

module.exports = {
  users,
  checkUserById,
  writeFile,
};
