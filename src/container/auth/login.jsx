// src/components/Login.jsx
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadTokenFromStorage } from "../../services/AuthService";
import { login } from "../../thunks/AuthThunks";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";
import { setEmail } from "../../slices/AccountSlice";

function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});
  const { isFetching } = useSelector((state) => state.authReducer);
  const authToken = loadTokenFromStorage();

  const handleLogin = () => {
    dispatch(login(user)).then((resp) => {
      if(resp.payload.code === "account_unverify") {
        dispatch(setEmail(user.email))
        nav('/ma-xac-thuc')
      } if(resp.payload.code === "") {
        window.history.pushState({}, null, "/");
      }
    })
  };

  useLayoutEffect(() => {
    window.history.pushState({}, null, "/");
  }, []);


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-500" onKeyDown={handleKeyDown}>
      <div className="w-full mx-5 max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">LOGIN</h2>
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
              values={user}
              id={"email"}
              setValue={setUser}
              required={"required"}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
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
          <div className="flex items-center justify-between">
            <Link
              to="/quen-mat-khau"
              className="text-sm text-blue-500 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div>
            <ButtonComponent
              textButton="Đăng nhập"
              style={
                "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }
              handleClick={handleLogin}
              type={"button"}
            />
          </div>
        </form>
        <div className="text-center">
          <Link to="/ma-xac-thuc" className="text-sm text-blue-500 hover:underline">
            Xác thực tài khoản
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
