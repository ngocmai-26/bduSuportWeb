import { useNavigate } from "react-router-dom";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { loadAuthRefreshFromStorage } from "../services/AuthService";

export const AppMiddleware = (props) => {
  const {  actionStatus } = useSelector((state) => state.authReducer);
  const nav = useNavigate();
  const refresh = loadAuthRefreshFromStorage();
 
  

  useLayoutEffect(() => {
    if (actionStatus==="account_unverify") {
      nav("/ma-xac-thuc");
    }
  }, [ actionStatus]);
  useLayoutEffect(() => {
    if (!refresh) {
      nav("/");
    }
  }, [ refresh]);
  return <>{props.children}</>;
};
