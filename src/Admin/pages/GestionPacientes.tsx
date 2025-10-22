import FormPacientes from "../components/gesPacientes/FormPacientes";
import TablePacientes from "../components/gesPacientes/TablePacientes";
import AsignarEnfermedades from "../components/gesPacientes/AsignarEnfermedades";
import VerEnfermedadesPaciente from "../components/gesPacientes/VerEnfermedadesPaciente"; // 👈

import SideBar from "../components/SideBar";

const GestionPacientes = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="ml-64 p-6 w-full min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestión de Pacientes
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 bg-white p-5 shadow-md rounded-lg border">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Crear Paciente
            </h2>
            <FormPacientes />
          </div>

          <div className="w-full lg:w-2/3 bg-white p-5 shadow-md rounded-lg border overflow-x-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Lista de Pacientes
            </h2>
            <TablePacientes />
          </div>
        </div>

        <div className="mt-8">
          <AsignarEnfermedades />
        </div>

        <div className="mt-8">
          <VerEnfermedadesPaciente />
        </div>
      </div>
    </div>
  );
};

export default GestionPacientes;
