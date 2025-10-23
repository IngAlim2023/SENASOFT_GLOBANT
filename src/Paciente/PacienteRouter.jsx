import { Routes, Route } from "react-router-dom";
import MisPedidos from "./pages/MisPedidos";
import Historial from "./pages/Historial";
import NuevoPedido from "./pages/NuevoPedido";
import DetallePedido from "./components/Mis-pedidos/DetallePedido";
import PacienteLayout from "./PacienteLayout";

export default function PacienteRouter() {
  return (
    <Routes>
      <Route element={<PacienteLayout />}>
        <Route index element={<MisPedidos />} />
        <Route path="mis-pedidos" element={<MisPedidos />} />
        <Route path="mis-pedidos/:id" element={<DetallePedido />} />
        <Route path="historial" element={<Historial />} />
        <Route path="nuevo-pedido" element={<NuevoPedido />} />
      </Route>
    </Routes>
  );
}