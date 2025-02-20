import React from "react";
import { SiApachehbase } from "react-icons/si";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import useAuthStore from "../Store/useAuthstore";

function Navbar() {
  const {logout} = useAuthStore()
  return (
    <div className="navbar  h-[10vh] w-full px-4 shadow-md">
      {/* Brand Name & Logo */}
      <div className="flex items-center gap-x-3 flex-1 text-primary font-semibold text-lg sm:text-xl">
        <Link to="/" className="hover:text-primary-focus transition duration-200 text-base-content">
          Quantam Talk
        </Link>
        <SiApachehbase className="text-primary" size={30} />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal gap-x-4">
          <li>
            <Link to="/settings" className="font-medium text-base text-base-content hover:text-primary transition">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/profile" className="font-medium text-base text-base-content hover:text-primary transition">
              Profile
            </Link>
          </li>
          <li>
            <Link className="font-medium text-base text-base-content hover:text-primary transition">
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <CiMenuKebab size={26} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-lg shadow-md z-[10] w-48 p-2 space-y-2"
        >
          <li>
            <Link to="/settings" className="font-medium text-base text-base-content hover:text-primary transition">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/profile" className="font-medium text-base text-base-content hover:text-primary transition">
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
  );
}

export default Navbar;
