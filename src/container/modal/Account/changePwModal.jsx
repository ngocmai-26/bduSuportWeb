import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormField } from "../../component/FormField";
import ButtonComponent from "../../component/ButtonComponent";
import { changePassword } from "../../../thunks/AuthThunks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ChangePwModal({ show, handleClose }) {
  const dispatch = useDispatch();

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState({
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSubmit = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwords.new_password || !regex.test(passwords.new_password)) {
      setError(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
      );
    } else if (
      passwords.new_password !== confirmNewPassword.confirmNewPassword
    ) {
      setError("Mật khẩu xác nhận không khớp với mật khẩu mới.");
    } else {
      setError("");
      dispatch(changePassword(passwords)).then(() => {
        setPasswords({ old_password: "", new_password: "" });
        setConfirmNewPassword({ confirmNewPassword: "" });
        handleClose();
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleClose}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Thay đổi mật khẩu
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form>
            {/* Mật khẩu cũ */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu cũ
              </label>
              <FormField
                name="old_password"
                values={passwords}
                id="old_password"
                setValue={setPasswords}
                required="required"
                type={showOldPassword ? "text" : "password"}
              />
              <span
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              style={{ top: "65%", transform: "translateY(-50%)" }} 
              >
                <FontAwesomeIcon
                  icon={showOldPassword ? faEyeSlash : faEye}
                  className="text-gray-500"
                />
              </span>
            </div>

            {/* Mật khẩu mới */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <FormField
                name="new_password"
                values={passwords}
                id="new_passwordChange"
                setValue={setPasswords}
                required="required"
                type={showNewPassword ? "text" : "password"}
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              style={{ top: "65%", transform: "translateY(-50%)" }} 
              >
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  className="text-gray-500"
                />
              </span>
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <FormField
                name="confirmNewPassword"
                values={confirmNewPassword}
                id="confirmNewPassword"
                setValue={setConfirmNewPassword}
                required="required"
                type={showConfirmNewPassword ? "text" : "password"}
              />
              <span
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              style={{ top: "65%", transform: "translateY(-50%)" }} 
              >
                <FontAwesomeIcon
                  icon={showConfirmNewPassword ? faEyeSlash : faEye}
                  className="text-gray-500"
                />
              </span>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Thay đổi"
                style="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                handleClick={handleSubmit}
                type="button"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePwModal;
