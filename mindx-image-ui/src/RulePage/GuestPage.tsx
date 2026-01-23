//là menber thì truy cạp binh thường
// khách thùi render bình  thường
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
function GuestPage() {
  const { user } = useAuth();
  const isMenber = !!user;
  return !isMenber ? <Outlet /> : <Navigate to="/" />;
}
export default GuestPage;
