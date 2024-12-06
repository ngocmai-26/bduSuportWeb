// src/components/ChangePassword.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";

function ChangePassword() {
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.error("New password and confirm password do not match!");
      return;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleChangePassword();
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-500"
      onKeyDown={handleKeyDown}
    >
      <div className="w-full mx-5 max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Change Password</h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <FormField
              name={"currentPassword"}
              values={passwordData}
              id={"currentPassword"}
              setValue={setPasswordData}
              required={"required"}
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <FormField
              name={"newPassword"}
              values={passwordData}
              id={"newPassword"}
              setValue={setPasswordData}
              required={"required"}
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <FormField
              name={"confirmPassword"}
              values={passwordData}
              id={"confirmPassword"}
              setValue={setPasswordData}
              required={"required"}
              type={showPassword ? "text" : "password"}
            />
          </div>
          <div>
            <ButtonComponent
              textButton="Submit"
              styleButton={
                "w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }
              handleClick={handleChangePassword}
              type={"button"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
