const mongoose = require("mongoose");

const provincesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Country",
  },
});

module.exports = mongoose.model("Province", provincesSchema);
