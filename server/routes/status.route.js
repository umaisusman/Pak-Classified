const express = require("express");
const router = express.Router();
const {
   createStatus,
   getAllStatuses,
   getStatusById,
   updateStatus,
   deleteStatus,
} = require("../controllers/adStatus.controller");
const { authorization, protect } = require("../middlewares/auth.middleware");

router.post("/", protect, authorization, createStatus);
router.get("/", getAllStatuses);
router.get("/:id", getStatusById);
router.put("/:id", protect, authorization, updateStatus);
router.delete("/:id", protect, authorization, deleteStatus);

module.exports = router;
