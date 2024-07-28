const express = require("express");
const router = express.Router();
const {
   createCategory,
   getAllCategories,
   getCategoryById,
   updateCategory,
   deleteCategory,
} = require("../controllers/adCategory.controller");
const { authorization, protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

// name , description , image

router.post("/", protect, authorization, upload.single("image") , createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", protect, authorization, updateCategory);
router.delete("/:id", protect, authorization, deleteCategory);

module.exports = router;
