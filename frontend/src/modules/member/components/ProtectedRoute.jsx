import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const member = localStorage.getItem("member_user_id");

if (!member) {
  return <Navigate to="/member/signin" replace />;
}
  

  return children;
}