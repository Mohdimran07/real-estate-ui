import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const AuthenticatedRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  const token = !!currentUser;
  // console.log(token)
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthenticatedRoutes;
