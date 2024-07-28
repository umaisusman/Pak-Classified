const Comment = require("../models/comment.model");

const Ad = require("../models/advertisements.model"); // Assuming you have an Ad model to associate comments with ads
const User = require("../models/users.model"); // Assuming you have a User model to reference the user

// Get comments for a specific ad
const getComments = async (req, res) => {
  const { adId } = req.params;

  try {
    const comments = await Comment.find({ adId }).populate("postedById");
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: error.message });
  }
};

// Add a new comment
const addComment = async (req, res) => {
  const { adId } = req.params;
  const { text } = req.body;
  const userId = req.user._id; // Assuming `req.user` is set by the `protect` middleware

  try {
    // Check if ad exists
    const ad = await Ad.findById(adId);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    const comment = new Comment({
      text,
      postedById: userId,
      adId, // Adding adId to the comment
    });

    const savedComment = await comment.save();
    const populatedComment = await Comment.findById(savedComment._id).populate(
      "postedById"
    );
    res.status(201).json(populatedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add comment", error: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id; // Assuming `req.user` is set by the `protect` middleware

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Ensure the user deleting the comment is the one who posted it
    if (comment.postedById.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
};

module.exports = {
  getComments,
  addComment,
  deleteComment,
};
