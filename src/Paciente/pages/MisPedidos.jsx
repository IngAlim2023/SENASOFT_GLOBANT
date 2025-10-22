import { useState } from "react";
import SideBar from "../components/SideBar";
import ButtonNuevoPedido from "../components/Mis-pedidos/ButtonNuevoPedido";
import { FaTruck, FaClipboardList, FaCalendarCheck, FaPills } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MisPedidos = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const pedidos = [
    { id: 1, medicamento: "Paracetamol 500mg", estado: "En preparación", fechaEntrega: "25 Oct 2025" },
    { id: 2, medicamento: "Ibuprofeno 400mg", estado: "En camino", fechaEntrega: "24 Oct 2025" },
    { id: 3, medicamento: "Omeprazol 20mg", estado: "Entregado", fechaEntrega: "20 Oct 2025" },
    { id: 4, medicamento: "Amoxicilina 500mg", estado: "En preparación", fechaEntrega: "28 Oct 2025" },
  ];

  return (
    <div className="flex">
      <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      {/* Contenido principal */}
      <div
        className={`bg-gray-50 min-h-screen ${
          isExpanded ? "ml-64" : "ml-22"
        } flex-1`}
      >
        {/* Encabezado */}
        <div className="border-b border-gray-300 flex items-center justify-between p-6 bg-white shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">Mis pedidos</h1>
        </div>

        {/* Sección de bienvenida */}
        <div className="text-white bg-blue-500 m-6 p-6 rounded-2xl shadow-md">
          <p className="text-lg font-medium">
            Bienvenido, <span className="font-bold">usuario asd</span>.
          </p>
          <p className="mt-2 text-sm text-blue-100">
            Gestione sus pedidos de medicamentos y consulte el estado de entregas.
          </p>
          <div className="mt-4">
            <ButtonNuevoPedido />
          </div>
        </div>

        {/* Tarjetas superiores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
          {/* Pedidos activos */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">Pedidos Activos</h2>
              <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
            </div>
            <div className="bg-blue-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
              <FaClipboardList />
            </div>
          </div>

          {/* Entregados este mes */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">Entregados este mes</h2>
              <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
            </div>
            <div className="bg-green-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
              <FaTruck />
            </div>
          </div>

          {/* Próxima entrega */}
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">Próxima Entrega</h2>
              <p className="text-lg font-bold text-gray-800 mt-1">24 Oct 2025</p>
            </div>
            <div className="bg-yellow-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
              <FaCalendarCheck />
            </div>
          </div>
        </div>

        {/* Sección inferior: Pedidos actuales */}
        <div className="m-6 mt-10 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaPills className="text-blue-500" /> Pedidos actuales
            </h2>
            <button
              onClick={() => navigate("/dashboard/historial")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Ver historial completo →
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                onClick={() => navigate(`/inicio/mis-pedidos/${pedido.id}`)}
                className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-md hover:bg-blue-50 transition-all cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-gray-800">{pedido.medicamento}</p>
                  <p className="text-sm text-gray-500">
                    Estado:{" "}
                    <span
                      className={`font-medium ${
                        pedido.estado === "Entregado"
                          ? "text-green-600"
                          : pedido.estado === "En camino"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {pedido.estado}
                    </span>
                  </p>
                </div>

                <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                  <span className="font-medium">Entrega:</span> {pedido.fechaEntrega}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisPedidos;