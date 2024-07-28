const mongoose = require("mongoose");

const advertisementCategoriesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:true
  },
  image: {
    type: String,
  },
});


module.exports = mongoose.model("Category", advertisementCategoriesSchema);
