import FormPedidos from "../components/gesPedidos/FormPedidos";
import TablePedidos from "../components/gesPedidos/TablePedidos";
import SideBar from "../components/SideBar";

const GestionPedidos = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col ml-64 lg:flex-row gap-6 items-start">
        <div className="w-full lg:max-w-md max-h-[85vh] overflow-y-auto">
          <FormPedidos />
        </div>

        <div className="w-full lg:flex-1">
          <TablePedidos />
        </div>
      </div>
    </div>
  );
};

export default GestionPedidos;
