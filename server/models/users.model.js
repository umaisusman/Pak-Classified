const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/email.service");

// A User Schema that defines the db
const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: String,
  },
  securityAnswer: {
    type: String,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/drc93iwpm/image/upload/v1718205510/account_ccspox.png",
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    default: "666d1ef8b8dec9e5cd8e2d3d",
    ref: "Role",
  },
  otp: {
    type: mongoose.Schema.Types.String,
    default: null,
  },
  expiryOtp: {
    type: mongoose.Schema.Types.Date,
    default: null,
  },
  isVerified: {
    type: mongoose.Schema.Types.Boolean,
    default: false,
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

// bcrypt in user schema
usersSchema.pre("save", async function () {
  if (this.password.startsWith("$2b$")) {
    return this.password;
  } else {
    return (this.password = await bcrypt.hash(this.password, Number(10)));
  }
});

// Update password method for changing password(change password and return boolean)
usersSchema.methods.updatePassword = async function (newPassword) {
  try {
    hashedPassword = await bcrypt.hash(newPassword, Number(10));
    this.password = hashedPassword;
    await this.save();
    return true;
  } catch (error) {
    console.error("Error while updating password");
    return false;
  }
};

// Compare Password Method for Compare Current password with encypted password (return Boolean)
usersSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Password not match");
    return false;
  }
};

// Generate a token for authorization purpose
usersSchema.methods.generateAuthTokem = function () {
  const payload = { _id: this._id };
  const secret = process.env.SECRET;
  const expiresIn = process.env.EXPIRES_IN;
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

usersSchema.methods.generateAndSendOtp = async function () {
  const generatedOtp = Math.floor(100000 + Math.random() * 900000); // Ensure OTP is 6 digits
  this.otp = generatedOtp.toString();

  const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  this.expiryOtp = expiryTime;


  await this.save();

  const emailTo = this.email;
  const emailSubject = "Verification Code";
  const emailText = `${generatedOtp}`;

  try {
    const sendedEmail = await sendEmail(emailTo, emailSubject, emailText);

    console.log("Message sent: %s", sendedEmail.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

usersSchema.methods.verifyOtp = async function (enteredOtp) {

  if (enteredOtp === this.otp) {
    if (this.expiryOtp > new Date()) {
      this.otp = null;
      this.expiryOtp = null;
      this.isVerified = true;

      const emailTo = this.email;
      const emailSubject = "You become a verified user!";
      const emailText = "Now! You can create ad. Have a nice day!";

      const sendedEmail = await sendEmail(emailTo, emailSubject, emailText);

      await this.save();
      return { success: true, message: "OTP verified successfully." };
    } else {
      return { success: false, message: "OTP has expired." };
    }
  } else {
    return { success: false, message: "Invalid OTP." };
  }
};

module.exports = mongoose.model("User", usersSchema);
