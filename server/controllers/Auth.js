import { sendVerificationCode, sendWelcomeEmail } from "../middleware/Email.js";
import User from "../model/UserModel.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        success: false,
      });
    }

    const emailDomain = email.split("@")[1];
    if (emailDomain !== "vitstudent.ac.in") {
      return res.status(400).json({
        message: "Please use your university email and try again",
        success: false,
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email already exists, please login",
        success: false,
      });
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashPassword,
      verificationCode,
    });

    await user.save();

    sendVerificationCode(user.email, user.verificationCode);

    return res.status(200).json({
      message: "Registration successful! Please login",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res
        .status(400)
        .json({ message: "Verification code is required", success: false });
    }

    const userExist = await User.findOne({ verificationCode: code });

    if (!userExist) {
      return res.status(400).json({
        message: "Invalid or expired verification code",
        success: false,
      });
    }

    userExist.isVerified = true;
    userExist.verificationCode = undefined;

    await userExist.save();

    await sendWelcomeEmail(userExist.email, userExist.name);

    return res.status(200).json({
      message: "Email verification successful",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
