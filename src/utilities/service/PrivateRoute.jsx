import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute() {
  const { authorized } = useAuth();

  // if (isLoading) {
  //     return (
  //         <h2>loading...</h2>
  //     )
  // };

  return authorized ? <Outlet /> : <Navigate to="/" />;
}
