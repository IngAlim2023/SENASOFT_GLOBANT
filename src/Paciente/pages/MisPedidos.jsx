import { useState } from "react";
import SideBar from "../components/SideBar";
import ButtonNuevoPedido from "../components/Mis-pedidos/ButtonNuevoPedido";
import {
  FaTruck,
  FaClipboardList,
  FaCalendarCheck,
  FaPills,
  FaRoute,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MisPedidos = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados para el generador de rutas
  const [loadingRuta, setLoadingRuta] = useState(false);
  const [resultadoRuta, setResultadoRuta] = useState(null);
  const [errorRuta, setErrorRuta] = useState(null);

  const pedidos = [
    { id: 1, medicamento: "Paracetamol 500mg", estado: "En preparación", fechaEntrega: "25 Oct 2025" },
    { id: 2, medicamento: "Ibuprofeno 400mg", estado: "En camino", fechaEntrega: "24 Oct 2025" },
    { id: 3, medicamento: "Omeprazol 20mg", estado: "Entregado", fechaEntrega: "20 Oct 2025" },
    { id: 4, medicamento: "Amoxicilina 500mg", estado: "En preparación", fechaEntrega: "28 Oct 2025" },
  ];

  // Generar ruta simulada sin webhook
  const generarRuta = async () => {
    setLoadingRuta(true);
    setErrorRuta(null);
    setResultadoRuta(null);

    try {
      // Simulación de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const dataSimulada = {
        success: true,
        mensaje: "Ruta generada correctamente para los pacientes con dirección válida.",
        totalPacientes: 5,
        pacientesConDireccion: 4,
        resumenTexto: `1️⃣ Paracetamol 500mg - Calle Los Álamos 123\n2️⃣ Ibuprofeno 400mg - Av. Central 456\n3️⃣ Amoxicilina 500mg - Calle San Martín 789\n4️⃣ Omeprazol 20mg - Jr. Las Flores 101`,
        mapsUrl:
          "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3901.416490322978!2d-77.04275422477327!3d-12.088288445959826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x9105c88f3a5ef54b%3A0x1db8f1a28b4b6d93!2sParque%20Kennedy%2C%20Miraflores!3m2!1d-12.1211789!2d-77.0290968!4m5!1s0x9105c8b04cb31b1d%3A0xf7dc02a4ccdfbb02!2sSan%20Isidro%2C%20Lima!3m2!1d-12.099432!2d-77.033903!5e0!3m2!1ses-419!2spe!4v1697040200000!5m2!1ses-419!2spe",
      };

      setResultadoRuta(dataSimulada);
    } catch (err) {
      setErrorRuta("Error al generar la ruta simulada.");
      console.error("Error al generar ruta simulada:", err);
    } finally {
      setLoadingRuta(false);
    }
  };

  return (
    <div className="flex">
      <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <div
        className={`bg-gray-50 min-h-screen ${
          isExpanded ? "ml-64" : "ml-22"
        } flex-1`}
      >
        <div className="border-b border-gray-300 flex items-center justify-between p-6 bg-white shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">Mis pedidos</h1>
        </div>

        <div className="text-white bg-blue-500 m-6 p-6 rounded-2xl shadow-md">
          <p className="text-lg font-medium">
            Bienvenido, <span className="font-bold">usuario</span>.
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

            {resultadoRuta.mapsUrl && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaMapMarkedAlt className="text-green-600" />
                  Vista previa de la ruta:
                </h4>
                <iframe
                  title="Ruta de entrega"
                  src={resultadoRuta.mapsUrl}
                  className="w-full h-[500px] rounded-lg border border-gray-300 shadow-sm"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setResultadoRuta(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">
                Pedidos Activos
              </h2>
              <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
            </div>
            <div className="bg-blue-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
              <FaClipboardList />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">
                Entregados este mes
              </h2>
              <p className="text-3xl font-bold text-gray-800 mt-1">5</p>
            </div>
            <div className="bg-green-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
              <FaTruck />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-gray-500 text-sm uppercase font-semibold">
                Próxima Entrega
              </h2>
              <p className="text-lg font-bold text-gray-800 mt-1">24 Oct 2025</p>
            </div>
            <div className="bg-yellow-500 h-14 w-14 rounded-xl flex items-center justify-center text-white text-2xl">
              <FaCalendarCheck />
            </div>
          </div>
        </div>

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
                  <p className="font-semibold text-gray-800">
                    {pedido.medicamento}
                  </p>
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
                  <span className="font-medium">Entrega:</span>{" "}
                  {pedido.fechaEntrega}
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
