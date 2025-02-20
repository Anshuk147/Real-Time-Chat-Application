const Message = require("../models/message.model");
const User = require("../models/user.model");

const getUserforsidebar = async (req, res) => {
  try {
    // Get the logged-in user's ID from req.user
    const LoggedInUserId = req.user._id;
    // console.log("Logged In User ID:", LoggedInUserId);

    // Fetch users excluding the logged-in user (using $ne for "not equal")
    const filteredUsers = await User.find({
      _id: { $ne: LoggedInUserId },
    }).select("-password"); // Exclude password field from the response

    // Check if users were found
    if (filteredUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Send the filtered users as a response
    return res.status(200).json({
      message: "Users fetched successfully",
      users: filteredUsers,
    });
  } catch (error) {
    console.error(error);
    // Return a 500 Internal Server Error if something went wrong
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};
const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // Get the ID of the user to chat with
    const myid = req.user._id; // Get the logged-in user's ID from req.user

    // Fetch the messages between the logged-in user and the user they want to chat with
    const messages = await Message.find({
      $or: [
        { senderId: myid, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myid },
      ],
    }).sort({ createdAt: 1 }); // Sort by message creation date (ascending)

    // Check if any messages are found
    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }

    // Return the found messages as a response
    return res.status(200).json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.error(error);
    // Return a 500 server error response if something goes wrong
    return res.status(500).json({
      message: "Error fetching messages",
      error: error.message,
    });
  }
};
const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body; 
    // console.log("text",text)
    const { id: receiverId } = req.params; // Extract receiver ID from route params
    const senderId = req.user._id; // Get sender ID from authenticated user
    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create and save new message in database
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      createdAt: new Date(),
    });

    await newMessage.save(); // Save the message in database

    //todo:socket io goes here

    // Return success response
    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    // Return error response if something goes wrong
    return res.status(500).json({
      message: "Error sending message",
      error: error.message,
    });
  }
};

module.exports = { getUserforsidebar, getMessages, sendMessage };
