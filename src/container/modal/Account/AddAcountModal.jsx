import React, { useState } from "react";
import { FormField } from "../../component/FormField";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import ButtonComponent from "../../component/ButtonComponent";
import { create } from "../../../thunks/AuthThunks";

const ModalAddAccount = ({ show, handleClose }) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [showPassword] = useState(false);
  const [showPasswordConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState({});

  const { errorsCreate } = useSelector((state) => state.authReducer);

  const newFormErrors = { ...errorsCreate };
  const [formErrors, setFormErrors] = useState(newFormErrors);

  // Kiểm tra độ mạnh của mật khẩu
  const checkPasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
const hasSpecialChars = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

    return (
      password?.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigits &&
      hasSpecialChars
    );
  };

  const handleSubmit = () => {
    const isStrong = checkPasswordStrength(user?.password);

    const newFormErrors = { ...errorsCreate };

    // Kiểm tra email
    if (user?.email) {
      if (!validator.isEmail(user?.email)) {
        newFormErrors.email = "Định dạng email không hợp lệ";
      }
    } else {
      newFormErrors.email = "Email là bắt buộc";
    }

    // Kiểm tra số điện thoại
    if (user?.phone) {
      if (!validator.isMobilePhone(user?.phone, 'any', { strictMode: false })) {
        newFormErrors.phone = "Định dạng số điện thoại không hợp lệ";
      }
    } else {
      newFormErrors.phone = "Số điện thoại là bắt buộc";
    };

    // Kiểm tra mật khẩu
    if (user?.password) {
      if (!isStrong) {
        newFormErrors.password = "Mật khẩu không đủ mạnh";
      } else if (user?.password !== confirmPassword?.confirmPassword) {
        newFormErrors.password = "Mật khẩu không khớp";
      }
    } else {
      newFormErrors.password = "Mật khẩu là bắt buộc";
    }

    // Kiểm tra mật khẩu xác nhận
    if (!confirmPassword?.confirmPassword) {
      newFormErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    }

    setFormErrors(newFormErrors);

    // Chỉ gửi form nếu không có lỗi
    if (Object.keys(newFormErrors).length === 0) {
      dispatch(create(user)).then((reps) => {
        handleClose();
        setUser({
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setConfirmPassword("");
      });
    }
  };

  const handleCloseModal = () => {
    handleClose();
    setFormErrors({});  // Reset formErrors khi đóng modal
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
            Thêm tài khoản
          </h2>
          <button
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            onClick={handleCloseModal} 
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
                errors={formErrors}  // Pass the error here
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
                errors={formErrors}  // Pass the error here
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
                errors={formErrors}  // Pass the error here
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
                errors={formErrors}  // Pass the error here
              />
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                textButton="Tạo mới"
                styleButton={
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
