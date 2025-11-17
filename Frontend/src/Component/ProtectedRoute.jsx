import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // If not logged in → redirect to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
