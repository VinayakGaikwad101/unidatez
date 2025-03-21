import cloudinary from "../middleware/cloudinaryConfig.js";
import User from "../model/UserModel.js";

export const updateProfile = async (req, res) => {
  try {
    const { images, imageToDelete, ...otherData } = req.body;
    let updatedData = otherData;
    
    // Get current user to access existing images
    const currentUser = await User.findById(req.user.id);
    let currentImages = currentUser.images || [];

    // Handle image deletion if requested
    if (imageToDelete) {
      currentImages = currentImages.filter(img => img !== imageToDelete);
      // Could add cloudinary.uploader.destroy here if needed
    }

    // Handle new image upload
    if (images && images.length > 0) {
      try {
        // Ensure we don't exceed 3 images
        const remainingSlots = 5 - currentImages.length;
        if (remainingSlots <= 0) {
          return res.status(400).json({
            message: "Maximum 5 images allowed",
            success: false
          });
        }

        // Upload new images
        const uploadPromises = images
          .slice(0, remainingSlots)
          .map(async (image) => {
            if (image.startsWith("data:image")) {
              const uploadResponse = await cloudinary.uploader.upload(image);
              return uploadResponse.secure_url;
            }
            return null;
          });

        const uploadedUrls = (await Promise.all(uploadPromises)).filter(url => url);
        updatedData.images = [...currentImages, ...uploadedUrls];

      } catch (error) {
        console.error(error);
        return res.status(400).json({
          message: "Failed to upload images.",
          success: false,
        });
      }
    } else {
      updatedData.images = currentImages;
    }

    // Ensure at least one image
    if (updatedData.images.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
        success: false
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    );

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
