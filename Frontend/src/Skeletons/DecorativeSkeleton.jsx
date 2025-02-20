import React from "react";

function DecorativeSkeleton() {
  return (
    <div className="hidden lg:flex w-1/2 h-full relative overflow-hidden items-center justify-center">
      {/* Floating Message Bubbles */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-primary/30 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-secondary/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-14 h-14 bg-accent/20 rounded-full animate-spin"></div>

      {/* Chat Dots Animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span className="w-3 h-3 bg-primary rounded-full animate-ping"></span>
        <span className="w-3 h-3 bg-secondary rounded-full animate-ping delay-150"></span>
        <span className="w-3 h-3 bg-accent rounded-full animate-ping delay-300"></span>
      </div>

      {/* Sliding Lines Effect */}
      <div className="absolute inset-0 flex flex-col space-y-6 opacity-10 pointer-events-none">
        <div className="w-full h-0.5 bg-primary animate-slide"></div>
        <div className="w-full h-0.5 bg-secondary animate-slide [animation-duration:8s]"></div>
        <div className="w-full h-0.5 bg-accent animate-slide [animation-duration:7s]"></div>
      </div>

      {/* Keyframes for Sliding Lines */}
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}

export default DecorativeSkeleton;
