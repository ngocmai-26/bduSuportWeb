import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthRefreshFromStorage } from "../services/AuthService";
import { logout } from "../slices/AuthSlice";

export const AppMiddleware = (props) => {
  const { actionStatus } = useSelector((state) => state.authReducer);
  const nav = useNavigate();
  const refresh = useRef(loadAuthRefreshFromStorage()); // Chỉ lấy giá trị 1 lần khi component mount
  const dispatch = useDispatch();
  const logoutCalledRef = useRef(false);

  useEffect(() => {
    if (actionStatus === "account_unverify") {
      nav("/ma-xac-thuc");
    }
  }, [actionStatus, nav]);

  useEffect(() => {
    // Kiểm tra nếu refresh.current là undefined hoặc false và logout chưa được gọi
    if ((refresh.current === undefined || refresh.current === false ) && !logoutCalledRef.current) {
      dispatch(logout());
      logoutCalledRef.current = true;
    }
  }, [dispatch, refresh.current]); // Chỉ phụ thuộc vào dispatch vì refresh đã được lưu vào ref

  return <>{props.children}</>;
};
