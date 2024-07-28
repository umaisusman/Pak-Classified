const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  postedById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad",
    required: true,
  },
  postedOn: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

module.exports = mongoose.model("Comment", commentSchema);
