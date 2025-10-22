import UseAuth from "../context/UseAuth";
import PacienteRouter from "../Paciente/PacienteRouter";
import AdminRouter from "../Admin/AdminRouter";

export default function DashboardRouter() {
  const { rol } = UseAuth();

  if (rol === 1) return <AdminRouter />;
  if (rol === 3) return <PacienteRouter />;

  return <h2>No se puede acceder</h2>;
}