import { useEffect, useState } from "react";
import supabase from "../../../api/supabase";

const TablePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("id, paciente_id, pacientes(usuario(nombre)), estado, prioridad, fecha_pedido, fecha_entrega_estimada");
      if (!error) setPedidos(data);
      setLoading(false);
    };
    fetchPedidos();
  }, []);

  if (loading) return <div className="p-4">Cargando pedidos...</div>;

  return (
    <div className="overflow-x-auto bg-white p-5 rounded-md shadow-md border">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Lista de Pedidos
      </h2>
      <table className="min-w-full border rounded">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Paciente</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Prioridad</th>
            <th className="px-4 py-2 text-left">Fecha Pedido</th>
            <th className="px-4 py-2 text-left">Entrega Estimada</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr
              key={p.id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-2 text-sm">
                {p.pacientes?.usuario?.nombre || "—"}
              </td>
              <td className="px-4 py-2 text-sm capitalize">{p.estado}</td>
              <td className="px-4 py-2 text-sm">{p.prioridad}</td>
              <td className="px-4 py-2 text-sm">
                {new Date(p.fecha_pedido).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-sm">
                {p.fecha_entrega_estimada
                  ? new Date(p.fecha_entrega_estimada).toLocaleDateString()
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePedidos;
