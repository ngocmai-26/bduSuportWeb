import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../thunks/AuthThunks";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";
import { setEmail } from "../../slices/AccountSlice";


function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: "", password: "" }); // Lưu lỗi cho từng trường

  // Hàm validate form
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Kiểm tra email
    if (!user.email) {
      newErrors.email = "Email không được bỏ trống";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email không hợp lệ";
      valid = false;
    }

    // Kiểm tra mật khẩu
    if (!user.password) {
      newErrors.password = "Mật khẩu không được bỏ trống";
      valid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) { // Kiểm tra lỗi trước khi thực hiện login
      dispatch(login(user)).then((resp) => {
        if (resp.payload.code === "account_unverify") {
          dispatch(setEmail(user.email));
          nav("/ma-xac-thuc");
        }
        if (resp.payload.code === "") {
          window.history.pushState({}, null, "/bdu-support");
        }
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  console.log("showPassword",showPassword)

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      onKeyDown={handleKeyDown}
    >
      <div className="w-full mx-5 max-w-md p-8 space-y-8 bg-white rounded-md shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          ĐĂNG NHẬP
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <FormField
              name={"email"}
              values={user}
              id={"login-email"} // Cập nhật id ở đây
              setValue={setUser}
              required={"required"}
              errors={errors} // Truyền errors vào
            />
          </div>
          <div className="relative items-center">
            <>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <FormField
              name={"password"}
              values={user}
              id={"login-password"} // Cập nhật id ở đây
              setValue={setUser}
              required={"required"}
              type={showPassword ? "text" : "password"}
              errors={errors} // Truyền errors vào
            /></>
            {/* Biểu tượng mắt */}
           
          </div>
          <div>
            <ButtonComponent
              textButton="Đăng nhập"
              styleButton={
                "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }
              handleClick={handleLogin}
              type={"button"}
            />
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/gui-lai-ma"
            className="text-sm text-blue-500 hover:underline"
          >
            Xác thực tài khoản
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
