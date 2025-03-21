import Message from "../model/MessageModel.js";
import { getConnectedUsers, getIO } from "../socket/serverSocket.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  try {
    const { receiverID, content } = req.body;

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverID,
      content,
    });

    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverID);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { userID } = req.params;
    const messages = await Message.find({
      $or: [
        { 
          sender: req.user._id, 
          receiver: userID,
          $or: [
            { deletedForSender: { $exists: false } },
            { deletedForSender: false }
          ]
        },
        { 
          sender: userID, 
          receiver: req.user._id,
          $or: [
            { deletedForReceiver: { $exists: false } },
            { deletedForReceiver: false }
          ]
        },
      ],
    }).sort("createdAt");

    return res.status(200).json({
      success: true,
      message: "Conversation retrieved successfully",
      messages,
    });
  } catch (error) {
    console.error("Error in getConversation controller: ", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getLastMessages = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { 
              sender: userId,
              $or: [
                { deletedForSender: { $exists: false } },
                { deletedForSender: false }
              ]
            },
            { 
              receiver: userId,
              $or: [
                { deletedForReceiver: { $exists: false } },
                { deletedForReceiver: false }
              ]
            }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$receiver",
              else: "$sender"
            }
          },
          lastMessage: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$lastMessage" }
      }
    ]);

    return res.status(200).json({
      success: true,
      message: "Last messages retrieved successfully",
      lastMessages: conversations
    });
  } catch (error) {
    console.error("Error in getLastMessages controller: ", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { deleteForAll } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (deleteForAll) {
      // Only the sender can delete for all
      if (message.sender.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this message for everyone",
        });
      }
      
      // Update message to show as deleted for all
      await Message.findByIdAndUpdate(messageId, {
        deletedForAll: true,
        content: "This message was deleted"
      });

      // Notify the other user about message deletion
      const io = getIO();
      const connectedUsers = getConnectedUsers();
      const receiverSocketId = connectedUsers.get(message.receiver.toString());
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("messageDeleted", {
          messageId,
          deleteForAll: true,
        });
      }
    } else {
      // Delete only for the requesting user
      const updateField = message.sender.toString() === req.user._id.toString()
        ? { deletedForSender: true }
        : { deletedForReceiver: true };
      
      await Message.findByIdAndUpdate(messageId, updateField);
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteMessage controller: ", error);
    res.status(500).json({ message: error.message, success: false });
  }
};
