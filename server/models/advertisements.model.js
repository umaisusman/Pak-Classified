const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const advertisementsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedById: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postedOn: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  statusId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    default: "666d3953b8dec9e5cd8e2d50",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  cityAreaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "CityArea",
  },
  image: {
    type: String,
  },
  public: {
    type: Boolean,
    default: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  impression: {
    type: Number,
    default: 0,
  },
  features: {
    type: Array,
    default: [],
  },
  saved: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "User",
      },
    },
  ],
});

advertisementsSchema.pre("save", function (next) {
  const uniqueLikes = [
    ...new Set(this.likes.map((like) => like.user.toString())),
  ].map((id) => ({ user: new mongoose.Types.ObjectId(id) }));
  this.likes = uniqueLikes;
  next();
});

module.exports = mongoose.model("Advertisement", advertisementsSchema);
