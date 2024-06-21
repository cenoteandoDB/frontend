import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";

export default function ProtectedRoute() {
  const auth = useAuthContext();

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" replace  />;
}
