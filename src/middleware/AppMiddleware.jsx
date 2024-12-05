import { useNavigate } from "react-router-dom";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
export const AppMiddleware = (props) => {
  const { logged, user, refresh, actionStatus } = useSelector((state) => state.authReducer);
  const nav = useNavigate();
  useLayoutEffect(() => {
    if (actionStatus==="account_unverify") {
      nav("/bdu-support/ma-xac-thuc");
    }
    if (user && refresh && refresh.uri) {
      nav("/bdu-support/");
    }
  }, [refresh, actionStatus]);
  return <>{props.children}</>;
};
