//Rutas del admin
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NuevoPedido from "./pages/NuevoPedido";
import Historial from "./pages/Historial";

export default function AdminRouter() {

    return (
            <Routes>
                <Route path="/*" element={<Dashboard />} />
                <Route path="dashboard/*" element={<Dashboard />} />
                <Route path="historial/*" element={<Historial />} />
                <Route path="nuevo-pedido/*" element={<NuevoPedido />} />
            </Routes>
    );
    
}