import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Settings from "./Pages/Settings";
import ProfilePage from "./Pages/ProfilePage";
import useThemeStore from "./Store/useThemestore";
import useAuthStore from "./Store/useAuthstore";

function App() {
  const { setTheme } = useThemeStore();
  const { checkAuth, AuthUser } = useAuthStore();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const initialize = async () => {
      await checkAuth(); // Wait for auth check
      setLoading(false); // Stop loading after auth check
    };
    
    initialize();

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, [setTheme, checkAuth]);

  // Show a loader while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={AuthUser ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={AuthUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={AuthUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/settings" element={AuthUser ? <Settings /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={AuthUser ? <ProfilePage /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
}

export default App;
