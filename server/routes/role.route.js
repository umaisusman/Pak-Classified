const express = require("express");
const router = express.Router();
const {
   createRole,
   getAllRoles,
   getRoleById,
   updateRole,
   deleteRole,
} = require("../controllers/roles.controller");
const { protect, authorization } = require("../middlewares/auth.middleware");

router.post("/", protect, authorization, createRole);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.put("/:id", protect, authorization, updateRole);
router.delete("/:id", protect, authorization, deleteRole);

module.exports = router;
