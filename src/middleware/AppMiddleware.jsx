import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthRefreshFromStorage } from "../services/AuthService";
import { logout } from "../slices/AuthSlice";

export const AppMiddleware = (props) => {
  const { actionStatus } = useSelector((state) => state.authReducer);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const logoutCalledRef = useRef(false);

  // State để lưu trữ giá trị refresh
  const [refresh, setRefresh] = useState(loadAuthRefreshFromStorage());

  // Lắng nghe thay đổi actionStatus để điều hướng
  useEffect(() => {
    if (actionStatus === "account_unverify") {
      nav("/ma-xac-thuc");
    }
  }, [actionStatus, nav]);

  // Lắng nghe trạng thái của refresh token và xử lý logout
  useEffect(() => {
    const handleRefreshCheck = () => {
      const currentRefresh = loadAuthRefreshFromStorage();
      setRefresh(currentRefresh);

      if ((currentRefresh === undefined || currentRefresh === false) && !logoutCalledRef.current) {
        dispatch(logout());
        logoutCalledRef.current = true;
      }
    };

    // Kiểm tra ngay khi component mount
    handleRefreshCheck();

    // Lắng nghe sự kiện storage thay đổi
    window.addEventListener("storage", handleRefreshCheck);

    return () => {
      window.removeEventListener("storage", handleRefreshCheck);
    };
  }, [dispatch]);

  return <>{props.children}</>;
};
