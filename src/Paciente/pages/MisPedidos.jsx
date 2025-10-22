import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonNuevoPedido from "../components/Mis-pedidos/ButtonNuevoPedido";
import Pagination from "../components/Mis-pedidos/Paginacion";
import { FaTruck, FaClipboardList, FaCalendarCheck, FaPills, FaSpinner } from "react-icons/fa";
import supabase from "../../api/supabase";

const MisPedidos = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);

  const pedidos = [
    { id: 1, medicamento: "Paracetamol 500mg", estado: "En preparación", fechaEntrega: "25 Oct 2025" },
    { id: 2, medicamento: "Ibuprofeno 400mg", estado: "En camino", fechaEntrega: "24 Oct 2025" },
    { id: 3, medicamento: "Omeprazol 20mg", estado: "Entregado", fechaEntrega: "20 Oct 2025" },
    { id: 4, medicamento: "Amoxicilina 500mg", estado: "En preparación", fechaEntrega: "28 Oct 2025" },
    { id: 5, medicamento: "Cetirizina 10mg", estado: "Entregado", fechaEntrega: "15 Oct 2025" },
    { id: 6, medicamento: "Metformina 850mg", estado: "En camino", fechaEntrega: "26 Oct 2025" },
    { id: 7, medicamento: "Atorvastatina 20mg", estado: "Entregado", fechaEntrega: "18 Oct 2025" },
    { id: 8, medicamento: "Losartán 50mg", estado: "En preparación", fechaEntrega: "29 Oct 2025" },
  ];

  // 🔹 Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPaginas = Math.ceil(pedidos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pedidosActuales = pedidos.slice(startIndex, startIndex + itemsPerPage);

  const cambiarPagina = (page) => {
    if (page >= 1 && page <= totalPaginas) setCurrentPage(page);
  };

  useEffect(() => {
    const fetchNombre = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("No se encontró el usuario:", userError);
          setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    fetchNombre();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FaSpinner className="text-4xl text-blue-600 animate-spin" />
        <p className="mt-2 text-gray-600 font-medium">Cargando tus pedidos...</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen flex-1">
      {/* Encabezado */}
      <div className="border-b border-gray-300 flex items-center justify-between p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Mis pedidos</h1>
      </div>

      {/* Sección de bienvenida */}
      <div className="text-white bg-blue-500 m-6 p-6 rounded-2xl shadow-md">
        <p className="text-lg font-medium">
          Bienvenido, <span className="font-bold">{nombre}</span>.
        </p>
        <p className="mt-2 text-sm text-blue-100">
          Gestione sus pedidos de medicamentos y consulte el estado de entregas.
        </p>
        <div className="mt-4">
          <ButtonNuevoPedido />
        </div>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg">
          <div>
            <h2 className="text-gray-500 text-sm uppercase font-semibold">Pedidos Activos</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
          </div>
          <div className="bg-blue-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
            <FaClipboardList />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg">
          <div>
            <h2 className="text-gray-500 text-sm uppercase font-semibold">Entregados este mes</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
          </div>
          <div className="bg-green-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
            <FaTruck />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg">
          <div>
            <h2 className="text-gray-500 text-sm uppercase font-semibold">Próxima Entrega</h2>
            <p className="text-lg font-bold text-gray-800 mt-1">24 Oct 2025</p>
          </div>
          <div className="bg-yellow-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
            <FaCalendarCheck />
          </div>
        </div>
      </div>

      {/* Pedidos actuales */}
      <div className="m-6 mt-6 bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaPills className="text-blue-500" /> Pedidos actuales
          </h2>
          <button
            onClick={() => navigate("/inicio/historial")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
          >
            Ver historial completo →
          </button>
        </div>

        {/* Lista de pedidos */}
        <div className="flex flex-col gap-4">
          {pedidosActuales.map((pedido) => (
            <div
              key={pedido.id}
              onClick={() => navigate(`/inicio/mis-pedidos/${pedido.id}`)}
              className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-md hover:bg-blue-50 cursor-pointer"
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

        {/* 🔹 Componente de paginación */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPaginas}
          onPageChange={cambiarPagina}
        />
      </div>
    </div>
  );
};

export default MisPedidos;