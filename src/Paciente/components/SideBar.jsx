import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import supabase from "../../api/supabase";
import UseAuth from "../../context/UseAuth";
import { LuPill } from "react-icons/lu";
import { BiHomeAlt } from "react-icons/bi";
import { useRef, useEffect } from "react";
import { FaHistory } from "react-icons/fa";

const SideBar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const { setIsAuth, setUserId } = UseAuth();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return toast.error("Error al cerrar sesión");

    setIsAuth(false);
    setUserId("");
    toast.success("Sesión cerrada");
    navigate("/home");
  };

  // 🔹 Mantener expandido si el mouse sigue encima, incluso al cambiar de ruta
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sidebarRef.current) return;
      const rect = sidebarRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        setIsExpanded(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setIsExpanded]);

  return (
    <div
      ref={sidebarRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`h-screen bg-white border-r border-gray-300 text-black flex flex-col p-4 shadow-lg fixed top-0 left-0 z-40 ${
        isExpanded ? "w-64" : "w-22"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 justify-center mb-6">
        <div className="bg-blue-500 rounded-lg p-2 text-white text-2xl flex justify-center items-center w-10 h-10 flex-shrink-0">
          <LuPill />
        </div>
        {isExpanded && <span className="text-xl font-bold">FarmaIA</span>}
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-2 mb-6">
        <NavLink
          to="/inicio/mis-pedidos"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          <BiHomeAlt className="text-2xl flex-shrink-0 w-6 h-6" />
          {isExpanded && <span>Mis pedidos</span>}
        </NavLink>

        <NavLink
          to="/inicio/nuevo-pedido"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          <LuPill className="text-2xl flex-shrink-0 w-6 h-6" />
          {isExpanded && <span>Nuevo pedido</span>}
        </NavLink>

        <NavLink
          to="/inicio/historial"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md ${
              isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          <FaHistory className="text-2xl flex-shrink-0 w-6 h-6" />
          {isExpanded && <span>Historial</span>}
        </NavLink>
      </nav>

      {/* Cerrar sesión */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-white text-red-600 hover:bg-gray-100"
      >
        <FiLogOut className="text-xl flex-shrink-0 w-5 h-5" />
        {isExpanded && "Cerrar sesión"}
      </button>

      <div className="pt-4 border-t border-gray-300 text-xs text-center text-gray-500 mt-4">
        {isExpanded && `© ${new Date().getFullYear()} FarmaIA`}
      </div>
    </div>
  );
};

export default SideBar;
