const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    comp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    resumes: [{ type: String, required: false }],
    job_d: { type: String, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = new mongoose.model("company", companySchema);
