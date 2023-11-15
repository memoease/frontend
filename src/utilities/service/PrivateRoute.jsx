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
