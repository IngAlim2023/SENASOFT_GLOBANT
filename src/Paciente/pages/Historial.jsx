import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaTruck, FaPercent, FaPills, FaSearch, FaFilter, FaSpinner } from "react-icons/fa";
import supabase from "../../api/supabase";
import Paginacion from "../components/Historial/Paginacion";

const Historial = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("Todos")

  // 🔹 Estados de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pedidosPorPagina = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("No se encontró el usuario:", userError);
          return;
        }

        const { data, error } = await supabase
          .from("usuario")
          .select("nombre")
          .eq("auth_id", user.id)
          .single();

        if (error) console.error("Error al obtener nombre:", error);
        else setNombre(data?.nombre || "Usuario");
      } catch (err) {
        console.error("Error general al obtener nombre:", err);
      }
    };

    const pedidosPrevios = [
      { id: "003", medicamento: "Enalapril 10 mg, Aspirina 100 mg", estado: "Entregado", solicitado: "14/10/2025", entregado: "15/10/2025" },
      { id: "002", medicamento: "Atorvastatina 20 mg", estado: "Entregado", solicitado: "9/10/2025", entregado: "10/10/2025" },
      { id: "001", medicamento: "Losartán 50 mg, Metformina 850 mg", estado: "En camino", solicitado: "30/9/2025" },
      { id: "000", medicamento: "Omeprazol 20 mg", estado: "Fallido", solicitado: "24/9/2025", nota: "No se encontró a nadie en la dirección" },
      { id: "099", medicamento: "Levotiroxina 100 mcg", estado: "En preparación", solicitado: "19/9/2025" },
    ];

    setPedidos(pedidosPrevios);

    fetchData().finally(() => setLoading(false));
  }, []);

    const pedidosFiltrados = pedidos.filter((p) => {
      const coincideBusqueda =
        p.medicamento.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.id.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado =
        filtroEstado === "Todos" || p.estado === filtroEstado;
      return coincideBusqueda && coincideEstado;
    });

  const totalPages = Math.ceil(pedidosFiltrados.length / pedidosPorPagina);
  const indexOfLast = currentPage * pedidosPorPagina;
  const indexOfFirst = indexOfLast - pedidosPorPagina;
  const pedidosActuales = pedidosFiltrados.slice(indexOfFirst, indexOfLast);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FaSpinner className="text-4xl text-blue-600 animate-spin" />
        <p className="mt-2 text-gray-600 font-medium">Cargando historial...</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen flex-1">
      {/* Encabezado */}
      <div className="border-b border-gray-300 flex items-center justify-between p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Historial de pedidos</h1>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 mt-6">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg"> 
          <div> 
            <h2 className="text-gray-500 text-sm uppercase font-semibold">Total de pedidos</h2> 
            <p className="text-3xl font-bold text-gray-800 mt-1">7</p> 
          </div>
          <div className="bg-blue-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
            <FaClipboardList />
          </div>
        </div>
      <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg"> <div> <h2 className="text-gray-500 text-sm uppercase font-semibold">Entregados</h2> <p className="text-3xl font-bold text-gray-800 mt-1">6</p> </div> <div className="bg-green-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl"> <FaTruck /> </div> </div> <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg"> <div> <h2 className="text-gray-500 text-sm uppercase font-semibold">Tasa de Éxito</h2> <p className="text-3xl font-bold text-gray-800 mt-1">86%</p> </div> <div className="bg-yellow-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl"> <FaPercent /> </div> </div> </div>

      {/* Historial de entregas */}
      <div className="m-6 mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
          <FaPills className="text-blue-500" /> Historial de Entregas
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Consulta todos tus pedidos anteriores.
        </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full justify-between">
        {/* Buscador */}
        <div className="flex items-center border border-gray-300 rounded-xl p-2 bg-gray-50 w-full">
          <FaSearch className="text-gray-400 ml-2 mr-3" />
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
          
        {/* Filtro por estado */}
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


        {/* Listado de pedidos */}
        <div className="flex flex-col gap-4">
          {pedidosActuales.map((pedido) => (
            <div
              key={pedido.id}
              onClick={() => navigate(`/inicio/mis-pedidos/${pedido.id}`)}
              className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-md hover:bg-blue-50 cursor-pointer"
            >
              <div>
                <p className="font-semibold text-gray-800">Pedido #{pedido.id}</p>
                <p
                  className={`text-sm font-medium ${
                    pedido.estado === "Entregado"
                      ? "text-green-600"
                      : pedido.estado === "Fallido"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {pedido.estado}
                </p>
                <p className="text-gray-600 text-sm">{pedido.medicamento}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Solicitado: {pedido.solicitado}{" "}
                  {pedido.entregado && <span> | Entregado: {pedido.entregado}</span>}
                  {pedido.nota && (
                    <span className="block text-red-500 mt-1 font-medium">
                      Nota: {pedido.nota}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/inicio/mis-pedidos/${pedido.id}`);
                }}
                className="mt-3 sm:mt-0 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Ver detalles →
              </button>
            </div>
          ))}
        </div>

        <Paginacion
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Historial;