// src/components/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "../component/FormField";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import ButtonComponent from "../component/ButtonComponent";
import { ErrorField } from "../component/ErrorField";

function Register() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState({});

  const { errorsRegister } = useSelector((state) => state.authReducer);

  const newFormErrors = { ...errorsRegister };
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
  const handleRegister = () => {
    const isStrong = checkPasswordStrength(registerData?.password);

    const newFormErrors = { ...errorsRegister };

    if (registerData?.email) {
      if (!validator.isEmail(registerData?.email)) {
        newFormErrors.email = "Format is incorrect";
      }
    }

    if (registerData?.password) {
      if (!isStrong) {
        newFormErrors.password = "Password is not strong enough";
      } else if (registerData?.password !== confirmPassword?.confirmPassword) {
        newFormErrors.password = "Password incorrect";
      }
    }

    setFormErrors(newFormErrors);

    if (Object.keys(newFormErrors).length === 0) {
      // dispatch(register(registerData)).then((reps) => {
      //   if (!reps.error) {
      //     localStorage.setItem("email", JSON.stringify(registerData?.email));
      //     nav("/ma-xac-thuc")
      //   }
      // });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          ĐĂNG KÝ
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <FormField
              name={"email"}
              values={registerData}
              id={"email"}
              setValue={setRegisterData}
              required={"email"}
            />
            <ErrorField errors={formErrors} field={"username"} />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <FormField
              name={"phone"}
              values={registerData}
              id={"phone"}
              setValue={setRegisterData}
              required={"phone"}
            />
            <ErrorField errors={formErrors} field={"phone"} />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật Khẩu
            </label>
            <FormField
              name={"password"}
              values={registerData}
              id={"password"}
              setValue={setRegisterData}
              required={"password"}
              type={showPassword ? "text" : "password"}
            />
            <ErrorField errors={formErrors} field={"password"} />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
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
            <ErrorField errors={formErrors} field={"confirmPassword"} />
          </div>
          <div>
          
            <ButtonComponent
              textButton="Đăng Kí"
              style={
                "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }
              handleClick={handleRegister}
              type={"button"}
            />
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/dang-nhap"
            className="text-sm text-blue-500 hover:underline"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
