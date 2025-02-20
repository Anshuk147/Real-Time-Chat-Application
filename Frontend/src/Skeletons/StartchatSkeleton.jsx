import React from "react";
import { IoChatbubblesOutline } from "react-icons/io5";

function StartChatSkeleton() {
  return (
    <div className="w-full h-[90vh] flex justify-center items-center text-center">
      {/* Placeholder for no chat selected */}
      <div className="w-96 p-8  rounded-lg">
        <div className="flex justify-center items-center mb-6">
          <IoChatbubblesOutline
            size={50}
            className="animate-bounce text-primary"
          />
        </div>
        <h2 className="text-2xl font-bold text-base-content mb-3">
          No Chat Selected
        </h2>
        <p className="text-sm text-base-content/80 mb-6">
          Select or start a new chat to begin messaging.
        </p>
        <button className="px-6 py-2 btn btn-primary font-semibold rounded-lg transition-all hover:scale-105">
          Start New Chat
        </button>
      </div>
    </div>
  );
}

export default StartChatSkeleton;
