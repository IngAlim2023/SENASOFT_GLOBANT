import { useState } from "react";

const NuevoPedido = () => {
  const [cantidad, setCantidad] = useState(1);

  const aumentarCantidad = () => setCantidad((prev) => prev + 1);
  const disminuirCantidad = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex">
      <div className="bg-gray-50 min-h-screen flex-1">
        {/* Encabezado */}
        <div className="border-b border-gray-300 flex items-center justify-between p-6 bg-white shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">Nuevo pedido</h1>
        </div>

        {/* Sección principal */}
        <div className="bg-white shadow-md rounded-xl p-6 m-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-1">
            Nuevo pedido de medicamentos
          </h2>
          <p className="text-gray-600 mb-6">
            Seleccione los medicamentos que desea solicitar y complete los datos de entrega.
          </p>

          {/* Cuadro de agregar medicamento */}
          <div className="border border-gray-300 rounded-xl p-4 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Agregar medicamentos</h3>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Selector de medicamento */}
              <select className="flex-1 border border-gray-300 rounded-lg px-2 h-10 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Seleccione un medicamento</option>
                <option value="paracetamol">Paracetamol 500mg</option>
                <option value="ibuprofeno">Ibuprofeno 400mg</option>
                <option value="amoxicilina">Amoxicilina 500mg</option>
              </select>

              {/* Control de cantidad */}
              <div className="flex items-center border border-gray-300 rounded-lg px-2 h-10">
                <button
                  onClick={disminuirCantidad}
                  className="px-2 text-gray-600 hover:text-blue-600 text-lg"
                >
                  –
                </button>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                  className="w-16 text-center outline-none"
                  min="1"
                />
                <button
                  onClick={aumentarCantidad}
                  className="px-2 text-gray-600 hover:text-blue-600 text-lg"
                >
                  +
                </button>
              </div>

              {/* Botón agregar */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-10 rounded-lg font-medium">
                Agregar
              </button>
            </div>
          </div>

          {/* Formulario de entrega */}
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Dirección de entrega
              </label>
              <input
                type="text"
                placeholder="Ingrese su dirección"
                
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Observaciones
              </label>
              <textarea
                placeholder="Ej: Entregar en portería o llamar antes de llegar"
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
          </div>

          {/* Botones finales */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="border border-gray-400 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100">
              Cancelar
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
              Enviar solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoPedido;