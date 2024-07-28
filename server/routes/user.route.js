const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getme,
  updatePassword,
  verifyOtp,
  resendOtp,
  updateUser,
  updateProfilePicture,
  removeProfilePicture,
  getSavedAds
} = require("../controllers/user.controller.js");
const { protect, authorization } = require("../middlewares/auth.middleware.js");
const upload = require("../middlewares/multer.middleware.js");

router.put("/updatedp",protect, upload.single("image"), updateProfilePicture )
router.put("/removedp",protect, removeProfilePicture )

// Route : Registeration of user
// Access : Public
router.post("/register", registerUser);

// Route : Login of user
// Access : User
router.post("/login", loginUser);

// Route : Verify Otp
// Acess User
router.post("/verify",protect, verifyOtp);

// Route : Resend Otp
// Acess User
router.post("/resendotp",protect, resendOtp);

// Route : Update User
// Access : User
router.put("/update", protect,updateUser);

// Route : Get User
// Access : Usre
router.get("/getme", protect,getme);

router.get("/getsaved", protect, getSavedAds);


// Route : Update Password
// Access : User
router.put("/updatepassword", protect, updatePassword);




module.exports = router;
