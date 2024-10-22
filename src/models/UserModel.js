const dbConn = require("../config/db.js");

exports.getAllUsers = async () => {
  try {
    const [rows, fields] = await dbConn.query(
      "SELECT id, name, email, address, phone, age FROM Users"
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (id) => {
  return users.find((user) => user.id === id);
};

exports.createUser = async (user) => {
  try {
    const [result] = await dbConn.execute(
      `
      INSERT INTO Users
      (name, email, address, phone, age)
      VALUES (?, ?, ?, ?, ?);
      `,
      [user.name, user.email, user.address, user.phone, user.age]
    );
    console.log(`${user.name} is now created!`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (user) => {
  try {
    const [result] = await dbConn.execute(
      `
      UPDATE Users set name = ?, email = ?, address = ?, phone = ?, age = ? WHERE id = ?`,
      [user.name, user.email, user.address, user.phone, user.age, user.id]
    );
    console.log(`${user.name} is now created!`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (id) => {
  try {
    const [result] = await dbConn.execute(
      `
      DELETE FROM Users WHERE id = ?`,
      [id]
    );
    console.log(`User with id ${id} has been deleted.`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
