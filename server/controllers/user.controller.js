const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const Ad = require("../models/advertisements.model");
const { Error } = require("mongoose");
const uploadOnCloud = require("../services/cloudinary.service");
const cron = require("node-cron");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @Route : /api/users/register
// @Method : POST
// @Access : Public
async function registerUser(req, res) {
  try {
    let { name, email, userName, password, birthDate, contactNumber } =
      req.body;

    // Check all input fields
    if (
      !name ||
      !email ||
      !userName ||
      !password ||
      !birthDate ||
      !contactNumber
    ) {
      throw new Error("Please Fill All fields Correctly");
    }

    // Check User Already Exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User Already Exists");
    }

    // Create a user
    const user = await User.create({
      name,
      email,
      userName,
      password,
      birthDate,
      contactNumber,
    });
    // Check User Existance
    if (user) {
      const token = user.generateAuthTokem();
      user.generateAndSendOtp();
      res.status(201).json({ user, token: token });
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    let {
      name,
      userName,
      birthDate,
      securityQuestion,
      securityAnswer,
      contactNumber,
    } = req.body;

    const id = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        userName,
        birthDate,
        securityQuestion,
        securityAnswer,
        contactNumber,
      },
      { new: true }
    );

    if (!updateUser) {
      res.status(400);
      throw new Error("Failed to update user");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/users/login
// @Method : POST
// @Access : User

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please fill all field correctly");
    }

    const user = await User.findOne({ email }).populate("roleId");

    if (user) {
      const isUser = await bcrypt.compare(password, user.password);
      if (isUser) {
        const token = user.generateAuthTokem();
        res.status(200).json({ user, token: token });
      } else {
        throw new Error("Please enter correct password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @Route : /api/users/getme
// @Method : GET
// @Access : Admin
async function getme(req, res) {
  const user = await User.findById(req.user.id)
    .populate("roleId")
    .select("-password");
  res.status(200).json(user);
}

// @Route : /api/users/updatepassword
// @Method : PUT
// @Access : User
async function updatePassword(req, res) {
  try {
    const id = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || !currentPassword) {
      res.status(404);
      throw new Error("All fields required");
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      res.status(400);
      throw new Error("Password don't match");
    }

    const success = await user.updatePassword(newPassword);

    if (!success) {
      res.status(401);
      throw new Error("failed to update password");
    }

    res.status(200).json({ message: "Password Changed successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
}

// @Route : /api/users/verify
// @Method : POST
// @Access : User
const verifyOtp = async function (req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const result = await user.verifyOtp(req.body.otp);
    if (result.success) {
      otpCronJob.stop();
      res.send(result.message);
    } else {
      res.status(400).send(result.message);
    }
  } catch (error) {
    res.status(500).send("Error verifying OTP");
  }
};

// @Route : /api/users/resendotp
// @Method : POST
// @Access : User
const resendOtp = async function (req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const otpSend = await user.generateAndSendOtp();
    if (otpSend) {
      res.status(200).json({ message: "OTP Resend successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfilePicture = async function (req, res) {
  const userId = req.user._id;
  const newDpPath = req.file?.path;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.image &&
      user.image !=
        "https://res.cloudinary.com/drc93iwpm/image/upload/v1718205510/account_ccspox.png"
    ) {
      const publicId = user.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId, function (result) {});
    }

    const uploadedImage = await uploadOnCloud(newDpPath);
    if (!uploadedImage)
      return res.status(400).json({ msg: "image not uploaded" });

    (user.image = uploadedImage.url), await user.save();

    res.status(200).json({ message: "Image updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeProfilePicture = async function (req, res) {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.image &&
      user.image !=
        "https://res.cloudinary.com/drc93iwpm/image/upload/v1718205510/account_ccspox.png"
    ) {
      const publicId = user.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId, function (result) {});
    }

    (user.image =
      "https://res.cloudinary.com/drc93iwpm/image/upload/v1718205510/account_ccspox.png"),
      await user.save();

    res.status(200).json({ message: "Image removed successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cron job for schedule auto null the otp and otpexpiry
let otpCronJob = cron.schedule("*/5 * * * *", async () => {
  try {
    const expiredUsers = await User.find({ expiryOtp: { $lt: new Date() } });
    expiredUsers.forEach(async (user) => {
      user.otp = null;
      user.expiryOtp = null;
      await user.save();
    });
  } catch (error) {
    console.error("Error clearing expired OTPs:", error);
  }
});

async function getSavedAds(req, res) {
  try {
    const userId = req.user._id;

    const searchCriteria = { 'saved.user': userId };

    const findedAds = await Ad.find(searchCriteria);
    if(!findedAds) {
      return res.status(404).json({ message: "No ads found" });
    }
    res.status(200).json(findedAds);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getme,
  updatePassword,
  verifyOtp,
  resendOtp,
  updateUser,
  updateProfilePicture,
  removeProfilePicture,
  getSavedAds,
};
