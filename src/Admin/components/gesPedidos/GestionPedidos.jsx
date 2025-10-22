import FormPedidos from "../components/gesPedidos/FormPedidos";
import TablePedidos from "../components/gesPedidos/TablePedidos";
import SideBar from "../components/SideBar";

const GestionPedidos = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="ml-64 p-6 w-full min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestión de Pedidos
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3">
            <FormPedidos />
          </div>

          <div className="w-full lg:w-2/3">
            <TablePedidos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionPedidos;
