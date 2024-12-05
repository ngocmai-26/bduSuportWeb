// src/components/VerifyCode.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '../component/FormField';
import { confirmAccount } from '../../thunks/AuthThunks';

function VerifyCode() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.accountsReducer);
  const [otp, setOtp] = useState({email: email, otp: ""});


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(confirmAccount(otp)).then((reps) => {
      if (!reps.payload) {
        nav("/bdu-support/dang-nhap");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen" >
      <div className="w-full mx-5 max-w-md p-8 space-y-8 bg-white rounded-md shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-gray-900">Nhập Mã Xác Nhận</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
        
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
          <Link to="/gui-lai-ma" className="text-sm text-blue-500 hover:underline">
            Gửi lại mã
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyCode;
