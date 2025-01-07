import User from "../model/UserModel.js";
import { getConnectedUsers, getIO } from "../socket/serverSocket.js";

// swipe right function in frontend
export const likeUser = async (req, res) => {
  try {
    const { likedUserID } = req.params;
    const currentUser = await User.findById(req.user.id);

    if (currentUser.image === "") {
      return res
        .status(400)
        .json({ message: "Upload your profile picture first", success: false });
    }

    const likedUser = await User.findById(likedUserID);

    if (!likedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!currentUser.likes.includes(likedUserID)) {
      currentUser.likes.push(likedUserID);
      await currentUser.save();

      // match condition
      if (likedUser.likes.includes(currentUser.id)) {
        currentUser.matches.push(likedUserID);
        likedUser.matches.push(currentUser.id);

        await Promise.all([await currentUser.save(), await likedUser.save()]);

        // SOCKET INTEGRATION BELOW:
        // io.emit for all users
        // io.to for specific users
        const connectedUsers = getConnectedUsers();
        const io = getIO();
        const likedUserSocketID = connectedUsers.get(likedUserID);
        if (likedUserSocketID) {
          // liked user is online then:
          // newMatch = event name
          io.to(likedUserSocketID).emit("newMatch", {
            _id: currentUser.id,
            name: currentUser.name,
            image: currentUser.image,
          });
        }

        const currentUserSocketID = connectedUsers.get(
          currentUser._id.toString()
        );
        if (currentUserSocketID) {
          // current user is online then:
          // newMatch = event name
          io.to(currentUserSocketID).emit("newMatch", {
            _id: likedUser._id,
            name: likedUser.name,
            image: likedUser.image,
          });
        }
      }
    }

    return res.status(200).json({
      message: "User liked successfully",
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.error("Error in likeUser controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// swipe left function in frontend
export const dislikeUser = async (req, res) => {
  try {
    const { dislikedUserID } = req.params;
    const currentUser = await User.findById(req.user.id);

    if (currentUser.image === "") {
      return res
        .status(400)
        .json({ message: "Upload your profile picture first", success: false });
    }

    if (!currentUser.dislikes.includes(dislikedUserID)) {
      currentUser.dislikes.push(dislikedUserID);
      await currentUser.save();
    }

    return res.status(200).json({
      message: "User disliked successfully",
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.error("Error in dislikeUser controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// to block a user
export const blockUser = async (req, res) => {
  try {
    const { blockUserID } = req.params;
    const currentUser = await User.findById(req.user.id);
    const blockedUser = await User.findById(blockUserID);

    if (!blockedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!currentUser.blocked.includes(blockUserID)) {
      currentUser.blocked.push(blockUserID);
      await currentUser.save();

      // Remove user from likes, dislikes, and matches if blocked
      currentUser.likes = currentUser.likes.filter(
        (id) => id.toString() !== blockUserID.toString()
      );
      currentUser.dislikes = currentUser.dislikes.filter(
        (id) => id.toString() !== blockUserID.toString()
      );
      currentUser.matches = currentUser.matches.filter(
        (id) => id.toString() !== blockUserID.toString()
      );
      await currentUser.save();
    }

    return res.status(200).json({
      message: "User blocked successfully",
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.error("Error in blockUser controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// to unblock a user
export const unblockUser = async (req, res) => {
  try {
    const { unblockUserID } = req.params;
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.blocked.includes(unblockUserID)) {
      return res
        .status(404)
        .json({ message: "User not found in blocked list", success: false });
    }

    currentUser.blocked = currentUser.blocked.filter(
      (id) => id.toString() !== unblockUserID.toString()
    );
    await currentUser.save();

    return res.status(200).json({
      message: "User unblocked successfully",
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.error("Error in unblockUser controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// to get liked users
export const getLikedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate(
      "likes",
      "name image age"
    );

    if (!currentUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Liked users fetched successfully",
      success: true,
      likes: currentUser.likes,
    });
  } catch (error) {
    console.error("Error in getLikedUsers controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// to get disliked users
export const getDislikedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate(
      "dislikes",
      "name image age"
    );

    if (!currentUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Disliked users fetched successfully",
      success: true,
      dislikes: currentUser.dislikes,
    });
  } catch (error) {
    console.error("Error in getDislikedUsers controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// in chat section to fetch all users that are "matched"
export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "matches",
      // add fields here that we want to send in the frontend(fields should exist in the User model)
      "name image age"
    );
    return res.status(200).json({
      message: "Matches retrieved successfully",
      success: true,
      matches: user.matches,
    });
  } catch (error) {
    console.error("Error in getMatches controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// to show swipe-able cards in frontend client
export const getUserProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const users = await User.find({
      $and: [
        // cannot see self in cards
        { _id: { $ne: currentUser.id } },
        // cannot see liked users in cards
        { _id: { $nin: currentUser.likes } },
        // cannot see disliked users in cards
        { _id: { $nin: currentUser.dislikes } },
        // cannot see matched users in cards
        { _id: { $nin: currentUser.matches } },
        // cannot see blocked users in cards
        { _id: { $nin: currentUser.blocked } },
        //  can see users whose gender matches the gender preference of the current user
        {
          gender:
            currentUser.genderPreference === "Both"
              ? { $in: ["Male", "Female"] }
              : currentUser.genderPreference,
        },
        // can see users whose gender preference matches the current user's gender
        { genderPreference: { $in: [currentUser.gender, "Both"] } },
      ],
    });

    return res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error in getUserProfiles controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// to show blocked users in frontend client
export const getBlockProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate(
      "blocked",
      "name image age"
    );

    if (!currentUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({
      message: "Blocked users fetched successfully",
      success: true,
      blocked: currentUser.blocked,
    });
  } catch (error) {
    console.error("Error in getBlockProfiles controller: ", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
