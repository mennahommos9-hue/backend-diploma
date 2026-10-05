const pool = require("../db/db.js");

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, password],
    );
    res.status(201).json({
      message: "user added successfully",
      data: newUser.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to add user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query("select * from users");
    res.status(200).json({
      message: "success",
      data: users.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get users",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: user.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get user",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await pool.query(
      `UPDATE users
   SET
     name = COALESCE($1, name),
     email = COALESCE($2, email),
     password = COALESCE($3, password)
   WHERE id = $4
   RETURNING *`,
      [name, email, password, id],
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "user updated successfully",
      data: user.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      message: "user deleted successfully",
      data: user.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to delete user",
      error: error.message,
    });
  }
};

const serchUser = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await pool.query("SELECT * FROM users WHERE name ILIKE $1", [
      `%${name}%`,
    ]);

    res.status(200).json({
      message: "success",
      data: users.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed search",
      error: error.message,
    });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  serchUser
};
