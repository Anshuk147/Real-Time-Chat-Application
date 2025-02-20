  import React, { useEffect, useRef, useState } from "react";
  import Navbar from "../Components/Navbar";
  import { MdPerson, MdEmail, MdCalendarToday, MdCameraAlt } from "react-icons/md";
  import { Toaster } from "react-hot-toast";
  import useAuthStore from "../Store/useAuthstore";

  const ProfilePage = () => {
    const { AuthUser ,updateProfilePic } = useAuthStore(); // ✅ Get AuthUser from Zustand store
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // useEffect(() => {
    //   console.log("AuthUser:", AuthUser);
    // }, [AuthUser]);

    // ✅ Show loader if user data is not available
    if (!AuthUser) {
      return (
        <div className="h-screen flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      );
    }

    // ✅ Extract only the required properties
    const { fullName, email, profilePic, createdAt } = AuthUser;

  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        updateProfilePic(file);
      }
    };

    return (
      <div className="h-full w-full">
        <Toaster />
        <Navbar />
        <div className="h-[90vh] w-full flex items-center justify-center px-4">
          <div className="lg:w-1/4 md:w-1/2 w-full bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-start border border-base-300">
            {/* Avatar & Name */}
            <div className="w-full flex flex-col items-center gap-3 mt-4 relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div
                className="avatar relative cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="w-28 h-28 rounded-full ring ring-primary overflow-hidden shadow">
                  {selectedImage || profilePic ? (
                    <img src={selectedImage || profilePic} alt="Profile" />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold ring ring-primary shadow">
                      {fullName ? fullName.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                </div>
                {/* Camera Icon */}
                <div className="absolute bottom-1 right-0 bg-base-100 p-2 rounded-full shadow-md">
                  <MdCameraAlt size={20} className="text-primary" />
                </div>
              </div>
              <span className="text-lg font-semibold">Account Information</span>
            </div>

            {/* Profile Details (Full Width) */}
            <div className="w-full mt-6 flex flex-col gap-4">
              <ProfileDetail icon={<MdPerson size={24} />} label="Full Name" text={fullName} />
              <ProfileDetail icon={<MdEmail size={24} />} label="Email" text={email} />
              <ProfileDetail icon={<MdCalendarToday size={24} />} label="Joined" text={new Date(createdAt).toDateString()} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ✅ Reusable Detail Component (Full Width)
  const ProfileDetail = ({ icon, label, text }) => (
    <div className="w-full flex items-center gap-3 bg-base-100 p-3 rounded-lg shadow border border-base-300">
      <span className="text-primary">{icon}</span>
      <div className="flex flex-col">
        <span className="text-sm text-base-content/60">{label}</span>
        <span className="text-base text-base-content">{text}</span>
      </div>
    </div>
  );

  export default ProfilePage;
