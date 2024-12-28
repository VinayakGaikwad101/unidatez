import Message from "../model/MessageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverID } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiverID: receiverID,
      content,
    });

    // TODO send message in real-time
    return res.status(200).json({
      message: "Message sent successfully",
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { userID } = req.params;
    // get messages sent by us and received by receiver, or sent by sender and received by us, and sort by createdAt
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiverID: userID },
        { sender: userID, receiverID: req.user.id },
      ],
    }).sort("createdAt");

    return res.status(200).json({
      message: "Conversation retrieved successfully",
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Error in getConversation controller: ", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
