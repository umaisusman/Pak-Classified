const express = require("express");
const router = express.Router();
const {
   createCity,
   getAllCities,
   getCityById,
   updateCity,
   deleteCity,
} = require("../controllers/cities.controller");
const { authorization, protect } = require("../middlewares/auth.middleware");

router.post("/", protect, authorization, createCity);
router.get("/", getAllCities);
router.get("/location/", getCityById);
router.put("/:id", protect, authorization, updateCity);
router.delete("/:id", protect, authorization, deleteCity);

module.exports = router;
