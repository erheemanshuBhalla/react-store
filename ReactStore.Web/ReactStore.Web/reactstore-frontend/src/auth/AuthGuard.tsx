import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  role?: string;
}

export default function AuthGuard({ children, role }: Props) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // store role on login

  if (!token) return <Navigate to="/login" />;

  if (role && role !== userRole) return <Navigate to="/" />;

  return children;
}
