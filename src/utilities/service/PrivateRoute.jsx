<<<<<<< HEAD
import { useAuth } from "../../utilities/hooks/useAuth.jsx";

export default function PrivateRoute() {
  const { authorized } = useAuth();

  // if (isLoading) {
  //     return (
  //         <h2>loading...</h2>
  //     )
  // };

  return authorized ? <Outlet /> : <Navigate to="/" />;
}
=======
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute() {
    const { authorized, loading } = useAuth();

    if (loading) {
        return <h2>loading...</h2>;
    }

    return authorized ? <Outlet /> : <Navigate to="/" />;
};
>>>>>>> bcb3f2d60f9ff4c7af0465d97225792663c36277
