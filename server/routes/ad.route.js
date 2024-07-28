const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware.js");
const {
   createAd,
   getAds,
   deleteAd,
   updateAd,
   getAd,
   getUserAds,
   getAdsByCategory,
   adSearch,
   likeAd,
   saveAd,
   removeSavedAd
} = require("../controllers/ad.controller.js");
const upload = require("../middlewares/multer.middleware");



// name , price , description , postedById(fixed) , postedOn(fixed) , statusId(fixed) , categoryId , cityAreaId , image

// # 1
// Route : Create ad
// Access : User
// URL : http://localhost:4500/api/ads/
router.post("/", protect, upload.single("image") , createAd);

// # 2
// Route : Get Ads Of A user
// Access : User
// URL : http://localhost:4500/api/ads/auth
router.get("/userads", protect, getUserAds);

// # 3
// Get ads by keyword , category , cityArea
// Access Public
// URL : http://localhost:4500/api/ads/search
router.post("/search", adSearch)

router.post("/saved/:id" , protect , saveAd)
router.delete("/removesave/:id" , protect , removeSavedAd)

// # 4
// Route : Get All Ads
// Access : Public
// URL : http://localhost:4500/api/ads/
router.get("/", getAds);

// # 5
// Route : Get ads by id
// Access : Public
// URL : http://localhost:4500/api/ads/:id/
router.get("/:id", getAd);

// # 6
// Route : Delete ad by id of ad
// Access : User
// URL : http://localhost:4500/api/ads/:id/
router.delete("/:id", protect, deleteAd);

// # 9
// Route : add like and remove like
// Access : User
// URL : http://localhost:4500/api/ads/isliked
router.put('/like/:id',protect, likeAd)

// # 7
// Route : Update ad by id of ad
// Access : User
// URL : http://localhost:4500/api/ads/:id/
router.put("/:id", protect, updateAd);

// # 8
// Route : Update ad by id of category
// Access : Public
// URL : http://localhost:4500/api/ads/getbycategory
router.post("/getbycategory", getAdsByCategory)











module.exports = router;
