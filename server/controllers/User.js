import cloudinary from "../middleware/cloudinaryConfig.js";
import User from "../model/UserModel.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;
    let updatedData = otherData;

    if (image) {
      // base64 format
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          //   secure_url is image url, store in db/access on client
          updatedData.image = uploadResponse.secure_url;
        } catch (error) {
          console.error(error);
          return res.status(400).json({
            message: "Failed to upload image.",
            success: false,
          });
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
