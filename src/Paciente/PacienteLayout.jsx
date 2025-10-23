import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../Paciente/components/SideBar";
import ChatN8n from "./components/chatn8n/ChatN8n";

export default function PacienteLayout() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex">

      <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />


      <main
        className={`bg-gray-50 min-h-screen flex-1 transition-none ${
          isExpanded ? "ml-64" : "ml-22"
        }`}
      >

        <Outlet />
      </main>

      <ChatN8n />
    </div>
  );
}