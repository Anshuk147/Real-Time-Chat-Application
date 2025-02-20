import React from "react";

function ChatBubble({ message, position, image }) {
  return (
    <div className={`chat ${position}`}>

      {/* Message Bubble */}
      <div className="chat-bubble chat-bubble-primary  px-4 py-2 max-w-xs break-words">
        {message && <p className="text-white break-words">{message}</p>}
        {image && (
          <img
            src={image}
            alt="Sent Image"
            className="rounded-lg max-w-[200px] mt-2"
          />
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
