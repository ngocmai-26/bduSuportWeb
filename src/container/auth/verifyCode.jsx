// src/components/VerifyCode.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '../component/FormField';
import { confirmAccount } from '../../thunks/AuthThunks';

function VerifyCode() {
  const [otp, setOtp] = useState({});
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(confirmAccount(otp)).then((reps) => {
      if (!reps.error) {
        nav("/dang-nhap");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Nhập Mã Xác Nhận</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email xác thực
            </label>
            <FormField
              name={"email"}
              values={otp}
              id={"email"}
              setValue={setOtp}
              required={"required"}
            />
          </div>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Mã Xác Nhận
            </label>
            <FormField
              name={"otp"}
              values={otp}
              id={"otp"}
              setValue={setOtp}
              required={"required"}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Xác nhận
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/quen-mat-khau" className="text-sm text-blue-500 hover:underline">
            Gửi lại mã
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyCode;
