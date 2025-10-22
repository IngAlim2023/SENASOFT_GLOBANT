import { Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import UseAuth from "../context/UseAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuth, rol, loading } = UseAuth();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FaSpinner className="text-4xl text-blue-600 animate-spin" />
        <p className="mt-2 text-gray-600 font-medium">Cargando...</p>
      </div>
    );

  if (!isAuth) return <Navigate to="/home" replace />;
  if (!allowedRoles.includes(rol)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;