import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import supabase from "../api/supabase";
import UseAuth from "../context/UseAuth";

const SideBar = () => {
  const navigate = useNavigate();
  const { setIsAuth, setUserId } = UseAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return toast.error("Error al cerrar sesión");
    }

    setIsAuth(false);
    setUserId('')
    toast.success("Sesión cerrada");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg fixed">
      {/* Logo */}
      <div className="text-2xl font-bold mb-10 text-center">
        Mi App
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Perfil
        </NavLink>
        <NavLink
          to="/ajustes"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors ${
              isActive ? "bg-blue-600" : "hover:bg-gray-700"
            }`
          }
        >
          Ajustes
        </NavLink>
      </nav>

      {/* Cerrar sesión */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors"
      >
        <FiLogOut className="text-lg" />
        Cerrar sesión
      </button>

      {/* Footer opcional */}
      <div className="pt-4 border-t border-gray-700 text-xs text-center text-gray-500 mt-4">
        © {new Date().getFullYear()} Mi Empresa
      </div>
    </div>
  );
};

export default SideBar;
