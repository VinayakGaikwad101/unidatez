import {
  sendVerificationCode,
  sendWelcomeEmail,
  sendEmail,
} from "../middleware/Email.js";
import { Password_Reset_Template } from "../libs/EmailTemplate.js";
import User from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, age, gender, genderPreference } = req.body;
    if (!email || !password || !age || !genderPreference || !gender || !name) {
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

    if (age < 17) {
      return res.status(400).json({
        message: "You must be atleast 17 years old",
        success: false,
      });
    }

    // disable this during production
    if (!(process.env.ENVIRONMENT === "production")) {
      const emailDomain = email.split("@")[1];
      if (emailDomain !== "vitstudent.ac.in") {
        return res.status(400).json({
          message: "Please use your university email and try again",
          success: false,
        });
      }
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      if (userExist.isVerified) {
        return res.status(400).json({
          message: "Email already exists, please login",
          success: false,
        });
      } else {
        return res.status(400).json({
          message: "Email already exists, please verify your email",
          success: false,
        });
      }
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashPassword,
      verificationCode,
      name,
      age,
      gender,
      genderPreference,
    });

    await user.save();

    sendVerificationCode(user.email, user.verificationCode);

    return res.status(200).json({
      message: "Registration successful! Please verify your email",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
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
      message: "Email verification successful, please Login",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
        success: false,
      });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationCode = verificationCode;
    await user.save();

    sendVerificationCode(user.email, user.verificationCode);

    return res.status(200).json({
      message: "OTP resent successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error resending OTP",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Email is not verified", success: false });
    }

    const token = signToken(user._id);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      sameSite: "strict",
      secure: !(process.env.ENVIRONMENT === "production"),
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).json({
    message: "Logout successful",
    success: true,
  });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Save reset token and expiry to user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL}reset-password/${resetToken}`;

    // Send reset email
    const emailTemplate = Password_Reset_Template.replace(
      "{resetLink}",
      resetUrl
    );
    await sendEmail(user.email, "Password Reset Request", emailTemplate);

    return res.status(200).json({
      message: "Password reset email sent",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error sending password reset email",
      success: false,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and new password are required",
        success: false,
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        success: false,
      });
    }

    // Verify token and find user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
        success: false,
      });
    }

    // Update password
    const hashPassword = bcryptjs.hashSync(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error resetting password",
      success: false,
    });
  }
};
