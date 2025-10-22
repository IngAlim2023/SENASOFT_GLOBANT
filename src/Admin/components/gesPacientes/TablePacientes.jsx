import React, { useEffect, useState } from "react";
import supabase from "../../../api/supabase";

const TablePacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true);

      // 🔗 Hacemos JOIN con las tablas relacionadas
      const { data, error } = await supabase
        .from("pacientes")
        .select(`
          id,
          nivel_vulnerabilidad,
          usuario:usuario_id(nombre, documento),
          regimen:regimen_id(tipo),
          eps:eps_id(nombre),
          municipio:municipio_id(nombre)
        `);

      if (error) {
        console.error("Error cargando pacientes:", error);
        setError("No se pudieron cargar los pacientes.");
      } else {
        setPacientes(data || []);
      }

      setLoading(false);
    };

    fetchPacientes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        <span className="animate-pulse">Cargando pacientes...</span>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-600 rounded-md">{error}</div>
    );

  if (pacientes.length === 0)
    return (
      <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-md">
        No hay pacientes registrados aún.
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Paciente
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Documento
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Régimen
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              EPS
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Municipio
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Vulnerabilidad
            </th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr
              key={p.id}
              className="border-t hover:bg-blue-50 transition duration-150"
            >
              <td className="px-6 py-3 text-gray-800 font-medium">
                {p.usuario?.nombre || "—"}
              </td>
              <td className="px-6 py-3 text-gray-600">{p.usuario?.documento || "—"}</td>
              <td className="px-6 py-3 text-gray-700">{p.regimen?.tipo || "—"}</td>
              <td className="px-6 py-3 text-gray-700">{p.eps?.nombre || "—"}</td>
              <td className="px-6 py-3 text-gray-700">{p.municipio?.nombre || "—"}</td>
              <td
                className={`px-6 py-3 font-semibold ${
                  p.nivel_vulnerabilidad === "ALTO"
                    ? "text-red-600"
                    : p.nivel_vulnerabilidad === "MEDIO"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {p.nivel_vulnerabilidad || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePacientes;
