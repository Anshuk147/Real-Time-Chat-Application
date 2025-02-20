import React from "react";
import Navbar from "../Components/Navbar";
import useThemeStore from "../Store/useThemestore"; // Import Zustand store
import { Toaster } from "react-hot-toast";
function Settings() {
  const { themes, setTheme } = useThemeStore(); // Get themes & function from Zustand

  return (
    <div className="min-h-screen w-full">
      <Toaster></Toaster>
      <Navbar />
      <div className="w-full flex justify-center items-center p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {themes.map((theme, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg p-4 rounded-lg text-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              onClick={() => setTheme(theme)} // Change theme on click
            >
              <div className="h-24 w-24 mx-auto rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-base font-semibold text-white capitalize">{theme}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
