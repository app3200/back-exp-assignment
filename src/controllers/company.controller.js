const express = require("express");

const Company = require("../models/company.model");

const router = express.Router();

const upload = require("../middlewares/upload.js");

router.get("/", async (req, res) => {
  try {
    const company = await Company.find()
      .populate({ path: "comp_id", select: { name: 1,role:1 } })
      .lean()
      .exec();
    return res.send(company);
  } catch (err) {
    console.log(err);
  }
});

router.post("/job_d", upload.single("job_d"), async (req, res) => {
  try {
    const company = await Company.create({
      comp_id: req.body.comp_id,
      job_d: req.file.path,
    });
    return res.send(company);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/resumes/:id", upload.array("resumes", 15), async (req, res) => {
  try {
    const filepath = req.files.map((file) => file.path);
    console.log(req.body, req.params.id);
    const company=await Company.findOneAndUpdate({comp_id:req.params.id},{
      resumes:filepath
    })
    return res.send(company);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
