import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");

  if (!token || !userJson) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userJson);

  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
