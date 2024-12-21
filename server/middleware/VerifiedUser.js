import User from "../model/UserModel.js";

export const verifiedUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!userExist.isVerified) {
      return res
        .status(403)
        .json({ message: "User not verified", success: false });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
