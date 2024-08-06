import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../asset/img/logo.png";
import { logout } from "../../slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.authReducer);

  const handleMouseEnter = () => {
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto flex justify-between items-center">
        <a href="" className="">
          <img src={Logo} alt="Logo" />
        </a>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border border-gray-300"
          />
          <span className="text-gray-700">Ngọc Mai</span>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="https://i.pinimg.com/originals/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            {showMenu && (
              <div className="absolute right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
