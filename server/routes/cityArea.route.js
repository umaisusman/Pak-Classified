const express = require("express");
const router = express.Router();
const {
   createCityArea,
   getAllCityAreas,
   getCityAreaById,
   updateCityArea,
   deleteCityArea,
} = require("../controllers/cityArea.controller");
const { authorization, protect } = require("../middlewares/auth.middleware");

router.post("/", protect, authorization, createCityArea);
router.get("/", getAllCityAreas);
router.get("/location/", getCityAreaById);
router.put("/:id", protect, authorization, updateCityArea);
router.delete("/:id", protect, authorization, deleteCityArea);

module.exports = router;
