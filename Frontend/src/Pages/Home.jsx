import React, { useEffect, useState } from "react";
import ChatContainer from "../Components/ChatContainer";
import { CiMenuKebab } from "react-icons/ci";
import { SiApachehbase } from "react-icons/si";
import StartChatSkeleton from "../Skeletons/StartchatSkeleton";
import { Link } from "react-router-dom";
import useAuthstore from "../Store/useAuthstore";
import { Toaster } from "react-hot-toast";
import useChatstore from "../Store/useChatstore";
import useSocketStore from "../Store/useSocketstore"; // Import Zustand store
function Home() {
  const { logout } = useAuthstore();
  const { selecteduser, setSelectedUser, getuserSidebar } = useChatstore();
  const [users, setUsers] = useState([]); // Initialize with an empty array
  const [search, setSearch] = useState("");

  const { connect, onlineUsers } = useSocketStore();

  useEffect(() => {
    connect();

    console.log("online users", onlineUsers);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getuserSidebar();
        // console.log("Fetched users:", data);

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          // console.error("Error: Expected an array, but got", data);
        }
      } catch (error) {
        // console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // console.log("Updated users state:", users);
  }, [users]);

  useEffect(() => {
    // console.log("Search value:", search);
  }, [search]);

  const filteredUsers = users.filter((user) => {
    if (!user?.fullName) {
      // console.warn("User object is missing 'fullName':", user);
      return false;
    }
    return user.fullName.toLowerCase().includes(search.toLowerCase());
  });

  // console.log("Filtered users:", filteredUsers);
  const handleUserClick = (user) => {
    // console.log("Selected User:", user);

    setSelectedUser(user);
  };

  return (
    <div className="drawer lg:drawer-open">
      <Toaster></Toaster>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar  h-[10vh] w-full px-4 shadow-md">
          {/* Sidebar Toggle (Mobile Only) */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-7 w-7 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          {/* Brand Name & Logo */}
          <div className="flex items-center gap-x-3 flex-1 text-primary font-semibold text-lg sm:text-xl">
            <Link
              to="/"
              className="hover:text-primary-focus transition duration-200 text-base-content"
            >
              Quantam Talk
            </Link>
            <SiApachehbase className="text-primary" size={30} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal gap-x-4">
              <li>
                <Link
                  to="/settings"
                  className="font-medium text-base text-base-content hover:text-primary transition"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="font-medium text-base text-base-content hover:text-primary transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    logout();
                  }}
                  className="font-medium text-base text-base-content hover:text-primary transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Dropdown */}
          <div className="lg:hidden dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <CiMenuKebab size={26} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-lg shadow-md z-[10] w-48 p-2 space-y-2"
            >
              <li>
                <Link
                  to="/settings"
                  className="font-medium text-base text-base-content hover:text-primary transition"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="font-medium text-base text-base-content hover:text-primary transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    logout();
                  }}
                  className="font-medium text-base text-base-content hover:text-primary transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        {selecteduser ? (
          <ChatContainer selecteduser={selecteduser}></ChatContainer>
        ) : (
          <StartChatSkeleton />
        )}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="w-80 h-screen bg-base-100 flex flex-col">
          {/* Sticky Search Bar */}
          <div className="p-3 border-b bg-base-100 sticky top-0 z-10 mt-6">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* User List (Scrollable) */}
          <div className="flex-1 overflow-y-auto mt-2">
            {filteredUsers.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-base-200 transition-colors duration-200"
                onClick={() => handleUserClick(item)}
              >
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={item.profilePic || "/user.png"}
                      alt="User Avatar"
                    />
                  </div>
                </div>

                <div className="flex flex-col flex-1 ml-3">
                  {/* Top Row: Name and Status */}
                  <div className="w-full flex items-center justify-between">
                    <span className="text-base font-medium">
                      {item.fullName}
                    </span>
                    {onlineUsers[item._id] ? ( // ✅ Check if user ID exists in onlineUsers object
                      <span className="text-green-500 text-sm ml-2">
                        ● Online
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm ml-2">
                        ● Offline
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
