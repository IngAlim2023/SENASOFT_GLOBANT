import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonNuevoPedido from "../components/Mis-pedidos/ButtonNuevoPedido";
import Pagination from "../components/Mis-pedidos/Paginacion";
import {
  FaTruck,
  FaPills,
  FaRoute,
  FaMapMarkedAlt,
  FaSpinner,
} from "react-icons/fa";
import supabase from "../../api/supabase";

const MisPedidos = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);

  // Estados para los pedidos
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Estados para el generador de rutas
  const [loadingRuta, setLoadingRuta] = useState(false);
  const [resultadoRuta, setResultadoRuta] = useState(null);
  const [errorRuta, setErrorRuta] = useState(null);

  const totalPaginas = Math.ceil(pedidos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pedidosActuales = pedidos.slice(startIndex, startIndex + itemsPerPage);

  const cambiarPagina = (page) => {
    if (page >= 1 && page <= totalPaginas) setCurrentPage(page);
  };

  // 🔹 Obtener nombre de usuario
  useEffect(() => {
    const fetchNombreYPedidos = async () => {
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

        // Obtener nombre
        const { data: userData, error: nameError } = await supabase
          .from("usuario")
          .select("nombre")
          .eq("auth_id", user.id)
          .single();

        if (nameError) console.error("Error al obtener nombre:", nameError);
        else setNombre(userData?.nombre || "Usuario");

        // Obtener pedidos del usuario
        const { data: pedidosData, error: pedidosError } = await supabase
          .from("pedidos")
          .select("*")
          .eq("usuario_id", user.id)
          .order("fechaEntrega", { ascending: false });

        if (pedidosError) console.error("Error al obtener pedidos:", pedidosError);
        else setPedidos(pedidosData || []);
      } catch (err) {
        console.error("Error general al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNombreYPedidos();
  }, []);

  // 🔹 Generar ruta (simulación)
  const generarRuta = async () => {
    setLoadingRuta(true);
    setErrorRuta(null);
    setResultadoRuta(null);

    try {
      // Aquí podrías hacer llamada real a tu API de rutas
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulación de resultado
      setResultadoRuta({
        success: true,
        mensaje: "Ruta generada correctamente para los pacientes con dirección válida.",
        totalPacientes: pedidos.length,
        pacientesConDireccion: pedidos.filter(p => p.direccion).length,
        resumenTexto: pedidos
          .map((p, i) => `${i + 1}️⃣ ${p.medicamento || "Medicamento"} - ${p.direccion || "Sin dirección"}`)
          .join("\n"),
        mapsUrl: "", // Aquí podrías incluir la URL del mapa si existe
      });
    } catch (err) {
      setErrorRuta("Error al generar la ruta.");
      console.error(err);
    } finally {
      setLoadingRuta(false);
    }
  };

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

      {/* Bienvenida y botones */}
      <div className="text-white bg-blue-500 m-6 p-6 rounded-2xl shadow-md">
        <p className="text-lg font-medium">
          Bienvenido, <span className="font-bold">{nombre}</span>.
        </p>
        <p className="mt-2 text-sm text-blue-100">
          Gestione sus pedidos de medicamentos y consulte el estado de entregas.
        </p>
        <div className="mt-4 flex gap-3">
          <ButtonNuevoPedido />
          <button
            onClick={generarRuta}
            disabled={loadingRuta}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {loadingRuta ? (
              <>
                <span className="animate-spin">⏳</span>
                Generando...
              </>
            ) : (
              <>
                <FaRoute />
                Generar Ruta de Entrega
              </>
            )}
          </button>
        </div>
      </div>

      {errorRuta && (
        <div className="mx-6 mb-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-xl flex items-start gap-3">
          <span className="text-xl">❌</span>
          <div>
            <p className="font-semibold">Error al generar la ruta</p>
            <p className="text-sm">{errorRuta}</p>
          </div>
        </div>
      )}

      {resultadoRuta && resultadoRuta.success && (
        <div className="mx-6 mb-6 bg-white p-6 rounded-2xl shadow-md border-2 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaMapMarkedAlt className="text-green-600" />
              Ruta de Entrega Generada
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              ✅ {resultadoRuta.totalPacientes} pacientes
            </span>
          </div>

          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">{resultadoRuta.mensaje}</p>
            <p className="text-sm text-green-700 mt-1">
              📍 Pacientes en la ruta: {resultadoRuta.totalPacientes} | Con dirección válida:{" "}
              {resultadoRuta.pacientesConDireccion}
            </p>
          </div>

          {resultadoRuta.resumenTexto && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaTruck className="text-blue-500" />
                Orden de entregas (por prioridad):
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700">
                  {resultadoRuta.resumenTexto}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pedidos actuales */}
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
          {pedidosActuales.map((pedido) => (
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