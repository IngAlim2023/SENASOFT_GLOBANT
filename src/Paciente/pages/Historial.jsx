import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import supabase from "../../api/supabase";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaRoute,
} from "react-icons/fa";
import Paginacion from "../components/Historial/Paginacion";

const Historial = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // 🔹 Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pedidosPorPagina = 5;

  // 🔑 Obtener usuario autenticado
  useEffect(() => {
    const getUsuario = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUsuario(user);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setError("No se pudo cargar el usuario.");
      }
    };
    getUsuario();
  }, []);

  // 🔄 Cargar pedidos según usuario
  useEffect(() => {
    const fetchPedidos = async () => {
      if (!usuario) return;

      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("pedidos")
          .select("*")
          .eq("paciente_id", usuario.id)
          .order("fecha_pedido", { ascending: false });

        if (error) throw error;
        setPedidos(data || []);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError("No se pudo cargar tu historial de pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [usuario]);

  // 🔹 Filtrado y búsqueda
  const pedidosFiltrados = pedidos.filter((p) => {
    const coincideBusqueda =
      p.medicamento?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.id?.toString().toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === "Todos" || p.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const totalPages = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);
  const indexOfLast = currentPage * pedidosPorPagina;
  const indexOfFirst = indexOfLast - pedidosPorPagina;
  const pedidosActuales = pedidosFiltrados.slice(indexOfFirst, indexOfLast);

  // 🎨 Colores e íconos según estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "pendiente":
      case "En preparación":
        return "bg-yellow-100 text-yellow-700";
      case "En camino":
      case "en_ruta":
        return "bg-blue-100 text-blue-700";
      case "Entregado":
      case "entregado":
        return "bg-green-100 text-green-700";
      case "Fallido":
      case "fallido":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Entregado":
      case "entregado":
        return <FaCheckCircle />;
      case "Fallido":
      case "fallido":
        return <FaTimesCircle />;
      case "En camino":
      case "en_ruta":
        return <FaRoute />;
      default:
        return <FaClock />;
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mt-2 text-gray-600 font-medium">Cargando historial...</p>
      </div>
    );

  return (
    <div className="flex">
      <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div
        className={`bg-gray-50 min-h-screen ${
          isExpanded ? "ml-64" : "ml-22"
        } flex-1 p-6 transition-all`}
      >
        <div className="border-b border-gray-300 flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> Historial de Pedidos
          </h1>
          <p className="text-sm text-gray-500">
            Consulta todos tus pedidos anteriores
          </p>
        </div>

        {/* Buscador y filtro */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full justify-between">
          <div className="flex items-center border border-gray-300 rounded-xl p-2 bg-gray-50 w-full">
            <input
              type="text"
              placeholder="Buscar por medicamento o número de pedido..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <select
            value={filtroEstado}
            onChange={(e) => {
              setFiltroEstado(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 text-gray-700 hover:bg-white cursor-pointer w-full sm:w-auto"
          >
            <option value="Todos">Todos</option>
            <option value="Entregado">Entregado</option>
            <option value="Fallido">Fallido</option>
            <option value="En preparación">En preparación</option>
            <option value="En camino">En camino</option>
          </select>
        </div>

        {/* Tabla de pedidos */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
          {pedidosActuales.length > 0 ? (
            pedidosActuales.map((pedido) => (
              <div
                key={pedido.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-md hover:bg-blue-50 cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-gray-800">Pedido #{pedido.id}</p>
                  <p
                    className={`inline-flex items-center gap-2 px-2 py-1 text-sm font-medium rounded-full ${getEstadoColor(
                      pedido.estado
                    )}`}
                  >
                    {getEstadoIcon(pedido.estado)} {pedido.estado}
                  </p>
                  <p className="text-gray-600 text-sm">{pedido.medicamento}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Solicitado: {pedido.fecha_pedido ? new Date(pedido.fecha_pedido).toLocaleDateString() : "-"}{" "}
                    {pedido.fecha_entrega_real && (
                      <span> | Entregado: {new Date(pedido.fecha_entrega_real).toLocaleDateString()}</span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-600">
              <FaTimesCircle className="text-4xl mx-auto text-gray-400 mb-3" />
              <p>No tienes pedidos registrados todavía.</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        <div className="mt-6">
          <Paginacion
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Historial;