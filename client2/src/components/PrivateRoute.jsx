import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = useSelector((state) => state.user.user.user);
  console.log(user);
  return <div>{user ? <Outlet /> : <Navigate to={"/signin"} />}</div>;
}
