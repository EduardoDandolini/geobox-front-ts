import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const roles = JSON.parse(sessionStorage.getItem("roles") || "[]");
  const isAuthorized = roles.some((role: string) => allowedRoles.includes(role));

  return isAuthorized ? children : <Navigate to="/unauthorized" replace />;
};
