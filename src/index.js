const express = require("express");
const connect = require("./config/db");

const app = express();

app.use(express.json());

const { register, login } = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const companyController = require("./controllers/company.controller");
const professionalController = require("./controllers/professional.controller")
app.post("/register", register);
app.post("/login", login);


app.use("/company",companyController)
app.use("/professional",professionalController)

app.use("/users", userController);


app.listen(4567, () => {
  try {
    connect();
    console.log("Listening at 4567");
  } catch (err) {
    console.log(err);
  }
});
