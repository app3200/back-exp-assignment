const express = require("express");
const router = express.Router();

const Professional = require("../models/professional.model");

const upload = require("../middlewares/upload.js");

router.get("/", async (req, res) => {
  try {
    const prof = await Professional.find()
    .populate({path:"p_id", select:{name:1,role:1}})
    .lean().exec();
    return res.send(prof);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    console.log(req.body);
    const prof = await Professional.create({
      p_id: req.body.p_id,
      resume: req.file.path,
    });
    return res.send(prof);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
