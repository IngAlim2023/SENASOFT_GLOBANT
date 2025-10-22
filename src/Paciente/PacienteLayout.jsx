import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../Paciente/components/SideBar";

export default function PacienteLayout() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar global */}
      <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Contenido principal que se ajusta según el estado del sidebar */}
      <main
        className={`bg-gray-50 min-h-screen flex-1 transition-none ${
          isExpanded ? "ml-64" : "ml-22"
        }`}
      >
        {/* Outlet muestra la página actual (MisPedidos, Historial, etc.) */}
        <Outlet />
      </main>
    </div>
  );
}