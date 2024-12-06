import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormField } from "../../component/FormField";
import ButtonComponent from "../../component/ButtonComponent";
import { changePassword } from "../../../thunks/AuthThunks";

function ChangePwModal({ show, handleClose }) {
  const dispatch = useDispatch();

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState({
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showOldPassword] = useState(false);
  const [showNewPassword] = useState(false);
  const [showConfirmNewPassword] = useState(false);

  const validate = () => {
    const errors = {};
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    // Validate old password
    if (!passwords.old_password) {
      errors.old_password = "Mật khẩu cũ không được để trống.";
    }

    // Validate new password
    if (!passwords.new_password) {
      errors.new_password = "Mật khẩu mới không được để trống.";
    } else if (!regex.test(passwords.new_password)) {
      errors.new_password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    }

    // Validate confirm new password
    if (!confirmNewPassword.confirmNewPassword) {
      errors.confirmNewPassword = "Xác nhận mật khẩu không được để trống.";
    } else if (passwords.new_password !== confirmNewPassword.confirmNewPassword) {
      errors.confirmNewPassword = "Mật khẩu xác nhận không khớp với mật khẩu mới.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(changePassword(passwords)).then(() => {
        setPasswords({ old_password: "", new_password: "" });
        setConfirmNewPassword({ confirmNewPassword: "" });
        handleClose();
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setConfirmNewPassword({});
    setPasswords({})
    setErrors({});  // Reset formErrors khi đóng modal
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${show ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Thay đổi mật khẩu
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal}
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
                errors={errors}
              />
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
                errors={errors}
              />
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
                errors={errors}
              />
            </div>

            <div className="flex justify-end">
              <ButtonComponent
                textButton="Thay đổi"
                styleButton="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
