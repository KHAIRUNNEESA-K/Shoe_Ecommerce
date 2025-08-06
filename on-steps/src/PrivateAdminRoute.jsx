import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const PrivateAdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default PrivateAdminRoute;
