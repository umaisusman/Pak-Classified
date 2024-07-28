const express = require("express");
const router = express.Router();
const {
    createCountry,
    getAllCountries,
    getCountryById,
    updateCountry,
    deleteCountry,
  } = require('../controllers/countries.controller')
const { authorization, protect } = require("../middlewares/auth.middleware");


router.post('/',protect ,authorization,  createCountry)
router.get("/" , getAllCountries)
router.get("/location/", getCountryById)
router.put("/:id",protect ,authorization,  updateCountry)
router.delete("/:id" ,protect ,authorization,  deleteCountry)



module.exports = router;
