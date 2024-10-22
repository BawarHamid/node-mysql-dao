const UserModel = require("../models/UserModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.render("index", { users });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, address, phone, age } = req.body;
    await UserModel.createUser({
      name,
      email,
      address,
      phone,
      age,
    });
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id, name, email, address, phone, age } = req.body;
    await UserModel.updateUser({
      id,
      name,
      email,
      address,
      phone,
      age,
    });
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await UserModel.deleteUser(id);
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
};
