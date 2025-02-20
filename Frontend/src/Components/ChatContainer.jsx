import React, { useEffect, useRef, useState } from "react";
import { FaVideo, FaPhoneAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import ChatBubble from "../Components/Chatbubble";
import useAuthStore from "../Store/useAuthstore";
import useChatStore from "../Store/useChatstore";
import useSocketStore from "../Store/useSocketstore";

function ChatContainer({ selecteduser }) {
  const { AuthUser } = useAuthStore();
  const { getMessages, messages, sendMessagetodb } = useChatStore();
  const { sendMessage, socket, socketMessages, addRealTimeMessage } = useSocketStore();
  
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);
  const receiverId = selecteduser?._id;
  const senderId = AuthUser?._id;
  
  // ✅ Fetch stored messages from MongoDB for the selected chat
  const dbMessages = messages || [];
  
  // ✅ Fetch real-time messages from Zustand socket store
  const realTimeMessages = socketMessages[receiverId] || [];
  
  // ✅ Merge both MongoDB messages & real-time messages
  const allMessages = [...dbMessages, ...realTimeMessages];
  
  // ✅ Fetch messages from MongoDB when the selected user changes
  useEffect(() => {
    if (receiverId) {
      getMessages(receiverId);
    }
  }, [receiverId, getMessages]);
  
  // ✅ Listen for incoming messages via Socket.io
  useEffect(() => {
    if (!socket) return;
  
    const handleIncomingMessage = (newMessage) => {
      // console.log(`📥 New message received:`, newMessage);
  
      // ✅ Store real-time message in Zustand state
      addRealTimeMessage(newMessage.senderId, newMessage);
    };
  
    socket.on("receive_message", handleIncomingMessage);
  
    return () => {
      socket.off("receive_message", handleIncomingMessage);
    };
  }, [socket, addRealTimeMessage]);
  
  // ✅ Scroll to the latest message when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // ✅ Enables smooth scrolling
      });
    }
  }, [allMessages]); // Triggers when messages update
  
  
  // ✅ Handle sending message
  const handleSubmit = async () => {
    if (!message.trim()) return;
  
    try {
      const newMessage = { senderId, receiverId, message };
  
      // ✅ Send message via Socket.io
      sendMessage(receiverId, message); //realtime
      // ✅ Send message to the database
      await sendMessagetodb(message, receiverId);
      // ✅ Add real-time message to UI immediately
      addRealTimeMessage(receiverId, newMessage);
  
      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };
  

  return (
    <div className="h-[90vh] flex flex-col bg-base-100">
      {/* 🔹 Chat Header */}
      <div className="px-5 py-4 bg-base-100 border-b flex items-center justify-between">
        {/* 🔹 Profile Avatar & Name */}
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={selecteduser?.profilePic || "/user.png"}
                alt="User Avatar"
              />
            </div>
          </div>
          <span className="font-medium text-base">
            {selecteduser?.fullName}
          </span>
        </div>

        {/* 🔹 Call & Video Icons */}
        <div className="flex items-center space-x-3">
          <FaVideo size={25} className="text-secondary cursor-pointer" />
          <FaPhoneAlt size={23} className="text-accent cursor-pointer" />
        </div>
      </div>

      {/* 🔹 Chat Body (Scrollable Messages) */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
        {allMessages.map((msg, index) => (
          <ChatBubble
            key={msg._id || index}
            message={msg.text} // Now both db and socket messages have 'text'
            image={msg.image}
            position={msg.senderId === senderId ? "chat-end" : "chat-start"}
            picture={
              msg.senderId === senderId
                ? AuthUser.profilePic
                : selecteduser?.profilePic
            }
          />
        ))}
      </div>

      {/* 🔹 Chat Input */}
      <div className="bg-base-100 px-5 py-3 border-t">
        <div className="flex items-center space-x-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full input input-bordered px-4 py-2"
            type="text"
            placeholder="Type your message..."
          />
          <button onClick={handleSubmit} className="btn btn-primary btn-circle">
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
