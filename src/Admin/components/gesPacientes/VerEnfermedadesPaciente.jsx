import { useEffect, useState } from "react";
import supabase from "../../../api/supabase";
import Select from "react-select";

const VerEnfermedadesPaciente = () => {
  const [pacientes, setPacientes] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar lista de pacientes
  useEffect(() => {
    const loadPacientes = async () => {
      const { data, error } = await supabase
        .from("pacientes")
        .select("id, usuario(nombre)");
      if (!error) setPacientes(data);
    };
    loadPacientes();
  }, []);

  // 🔹 Cargar enfermedades del paciente seleccionado
  useEffect(() => {
    const loadEnfermedades = async () => {
      if (!pacienteSeleccionado) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("paciente_enfermedad")
        .select("enfermedades_cronicas(nombre, clasificacion)")
        .eq("paciente_id", pacienteSeleccionado.value);

      if (!error) {
        setEnfermedades(data || []);
      }
      setLoading(false);
    };

    loadEnfermedades();
  }, [pacienteSeleccionado]);

  const pacienteOptions = pacientes.map((p) => ({
    value: p.id,
    label: p.usuario?.nombre || `Paciente #${p.id}`,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mt-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Enfermedades por Paciente
      </h2>

      {/* Select Paciente */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Selecciona un paciente
        </label>
        <Select
          options={pacienteOptions}
          onChange={setPacienteSeleccionado}
          placeholder="Buscar paciente..."
          isClearable
        />
      </div>

      {/* Estado de carga */}
      {loading && <p className="text-gray-500">Cargando enfermedades...</p>}

      {/* Lista de enfermedades */}
      {!loading && pacienteSeleccionado && (
        <div>
          {enfermedades.length > 0 ? (
            <table className="min-w-full border rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Enfermedad
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Clasificación
                  </th>
                </tr>
              </thead>
              <tbody>
                {enfermedades.map((e, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 text-sm">
                      {e.enfermedades_cronicas?.nombre}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {e.enfermedades_cronicas?.clasificacion || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">
              Este paciente no tiene enfermedades registradas.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerEnfermedadesPaciente;
