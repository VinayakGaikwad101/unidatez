import Message from "../model/MessageModel.js";
import { getConnectedUsers, getIO } from "../socket/serverSocket.js";

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
      message: "Message sent successfully",
      success: true,
      message: newMessage,
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
        { sender: req.user._id, receiver: userID },
        { sender: userID, receiver: req.user._id },
      ],
    }).sort("createdAt");

    return res.status(200).json({
      message: "Conversation retrieved successfully",
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error in getConversation controller: ", error);
    res.status(500).json({ message: error.message, success: false });
  }
};
