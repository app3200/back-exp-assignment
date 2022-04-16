const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send("User already exist");
    }

    let body = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role
    };

    user = await User.create(body);

    return res.send({ user });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send("Invalid Credential");
    }
    const match = await user.checkPassword({
      password: req.body.password,
    });

    if (!match) {
      return res.send("Invalid Password");
    }
    const success = { msg: "Login Successful" };
    return res.send({ success, user });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
