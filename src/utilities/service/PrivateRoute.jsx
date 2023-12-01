import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute() {
  const { authorized, loading } = useAuth();

  if (loading) {
    return <h2>loading...</h2>;
  }

  return authorized ? <Outlet /> : <Navigate to="/" />;
}
