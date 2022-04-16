const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["company", "professional"] },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password.password, this.password);
};

module.exports = mongoose.model("user", userSchema);
