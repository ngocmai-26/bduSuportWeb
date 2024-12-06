import React, { useState } from "react";
import Logo from "../../asset/img/logo.png";
import { logout } from "../../slices/AuthSlice";
import { useDispatch } from "react-redux";
import ChangePwModal from "../modal/Account/changePwModal";
import { loadAuthInfoFromStorage } from "../../services/AuthService";
import { INFO_KEY_NAME } from "../../constants/api";

function Header() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = loadAuthInfoFromStorage(INFO_KEY_NAME); 

  const [showChangePwModal, setShowChangePwModal] = useState(false);

  const handleShowChangePwModal = () => setShowChangePwModal(true);
  const handleCloseChangePwModal = () => setShowChangePwModal(false);

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

  const handleChangePwModal = (row) => {
    handleShowChangePwModal();
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-10">
      <div className="mx-auto flex justify-between items-center">
      <img src={Logo} alt="Logo" width={100} />
        <div className="flex items-center space-x-4">
        
          <span className="text-gray-700">{user?.email}</span>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="https://i.pinimg.com/1200x/bc/43/98/bc439871417621836a0eeea768d60944.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            {showMenu && (
              <div className="absolute right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                <button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={handleChangePwModal}
                >
                  Đổi mật khẩu
                </button>
               
                <button
  onClick={handleLogout}
  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
>
  Đăng xuất
</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ChangePwModal show={showChangePwModal} handleClose={handleCloseChangePwModal} />
    </header>
  );
}

export default Header;
