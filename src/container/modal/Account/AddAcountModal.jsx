import React, { useState } from "react";
import { FormField } from "../../component/FormField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import ButtonComponent from "../../component/ButtonComponent";
import { create } from "../../../thunks/AuthThunks";

const ModalAddAccount = ({ show, handleClose }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState({});

  const { errorsCreate } = useSelector((state) => state.authReducer);

  const newFormErrors = { ...errorsCreate };
  const [formErrors, setFormErrors] = useState(newFormErrors);

  const checkPasswordStrength = (password) => {
    // Đặt các yêu cầu mật khẩu của bạn ở đây
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    // Kiểm tra tất cả các điều kiện
    const isStrongPassword =
      password?.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigits &&
      hasSpecialChars;
    return isStrongPassword;
  };
  const handleSubmit = () => {
    const isStrong = checkPasswordStrength(user?.password);

    const newFormErrors = { ...errorsCreate };

    if (user?.email) {
      if (!validator.isEmail(user?.email)) {
        newFormErrors.email = "Format is incorrect";
      }
    }

    if (user?.password) {
      if (!isStrong) {
        newFormErrors.password = "Password is not strong enough";
      } else if (user?.password !== confirmPassword?.confirmPassword) {
        newFormErrors.password = "Password incorrect";
      }
    }

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      dispatch(create(user)).then((reps) => {
        if (!reps.error) {
          handleClose();
          setUser({})
        }
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
            Thêm tài khoản
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleClose}
          >
            X
          </button>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>

              <FormField
                name={"email"}
                values={user}
                id={"email"}
                setValue={setUser}
                required={"required"}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>

              <FormField
                name={"phone"}
                values={user}
                id={"phone"}
                setValue={setUser}
                required={"required"}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>

              <FormField
                name={"password"}
                values={user}
                id={"password"}
                setValue={setUser}
                required={"required"}
                type={showPassword ? "text" : "password"}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nhập lại mật khẩu
              </label>
              <FormField
                name={"confirmPassword"}
                values={confirmPassword}
                id={"confirmPassword"}
                setValue={setConfirmPassword}
                type={showPasswordConfirm ? "text" : "password"}
                required={"required"}
              />
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                textButton="Đăng Kí"
                style={
                  "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }
                handleClick={handleSubmit}
                type={"button"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAddAccount;
