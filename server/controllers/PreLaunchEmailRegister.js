import Email from "../model/EmailModel.js";

export const preLaunchEmailRegister = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", success: false });
    }

    const isEmailRegistered = await Email.findOne({ email });

    if (isEmailRegistered) {
      return res
        .status(400)
        .json({ message: "Email already registered", success: false });
    }

    await Email.create({ email });

    return res
      .status(200)
      .json({ message: "Email registration successful", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
