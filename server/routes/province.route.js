const express = require("express");
const router = express.Router();
const {
   createProvince,
   getAllProvinces,
   getProvinceById,
   updateProvince,
   deleteProvince,
} = require("../controllers/provinces.controller");
const { authorization, protect } = require("../middlewares/auth.middleware");

router.post("/", protect, authorization, createProvince);
router.get("/", getAllProvinces);
router.get("/location/", getProvinceById);
router.put("/:id", protect, authorization, updateProvince);
router.delete("/:id", protect, authorization, deleteProvince);

module.exports = router;
