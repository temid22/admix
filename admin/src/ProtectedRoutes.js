import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const admin = JSON.parse(localStorage.getItem("user"))?.isAdmin;
  return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
