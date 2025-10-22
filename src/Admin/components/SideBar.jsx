import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import supabase from "../../api/supabase";
import UseAuth from "../../context/UseAuth";

// Icons
import { LuPill } from "react-icons/lu";
import { BiHomeAlt } from "react-icons/bi";

const SideBar = () => {
  const navigate = useNavigate();
  const { setIsAuth, setUserId } = UseAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return toast.error("Error al cerrar sesión");
    }

    setIsAuth(false);
    setUserId("");
    toast.success("Sesión cerrada");
    navigate("/home"); // Redirige al home público
  };

  return (
    <div className="w-64 h-screen bg-white border border-gray-300 text-white flex flex-col p-4 shadow-lg fixed">
      {/* Logo */}
      <div className="text-xl font-bold mb-6 text-center flex items-center gap-3 text-black justify-center">
        <div className="bg-blue-500 rounded-lg p-2 text-white">
          <LuPill />
        </div>
        FarmaIA
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-4 mb-6 text-black">
        <NavLink
          to="/inicio/dashboard"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors flex items-center gap-3 ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          <BiHomeAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/inicio/nuevo-pedido"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors flex items-center gap-3 ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          <LuPill />
          Nuevo Pedido
        </NavLink>

        <NavLink
          to="/inicio/historial"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors flex items-center gap-3 ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          <BiHomeAlt />
          Historial
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

      {/* Footer */}
      <div className="pt-4 border-t border-gray-300 text-xs text-center text-gray-500 mt-4">
        © {new Date().getFullYear()} FarmaIA
      </div>
    </div>
  );
};

export default SideBar;