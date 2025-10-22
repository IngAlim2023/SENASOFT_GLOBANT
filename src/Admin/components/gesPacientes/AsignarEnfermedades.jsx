import { useEffect, useState } from "react";
import Select from "react-select";
import supabase from "../../../api/supabase";

const AsignarEnfermedades = () => {
  const [pacientes, setPacientes] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [selectedEnfermedades, setSelectedEnfermedades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // 🔹 Cargar pacientes y enfermedades
  useEffect(() => {
    const fetchData = async () => {
      const [pacientesRes, enfermedadesRes] = await Promise.all([
        supabase.from("pacientes").select(`
          id,
          usuario:usuario_id(nombre)
        `),
        supabase.from("enfermedades_cronicas").select("id, nombre, clasificacion"),
      ]);

      if (pacientesRes.data) setPacientes(pacientesRes.data);
      if (enfermedadesRes.data) setEnfermedades(enfermedadesRes.data);
    };

    fetchData();
  }, []);

  // 🔹 Opciones para los selects
  const pacienteOptions = pacientes.map((p) => ({
    value: p.id,
    label: p.usuario?.nombre || `Paciente #${p.id}`,
  }));

  const enfermedadOptions = enfermedades.map((e) => ({
    value: e.id,
    label: `${e.nombre}${e.clasificacion ? ` (${e.clasificacion})` : ""}`,
  }));

  // 🔹 Guardar asignaciones
  const handleAsignar = async () => {
    if (!selectedPaciente || selectedEnfermedades.length === 0) {
      setMensaje({ tipo: "error", texto: "Selecciona un paciente y al menos una enfermedad." });
      return;
    }

    setLoading(true);
    setMensaje(null);

    try {
      // Crear los registros en paciente_enfermedad
      const inserts = selectedEnfermedades.map((e) => ({
        paciente_id: selectedPaciente.value,
        enfermedad_id: e.value,
      }));

      const { error } = await supabase.from("paciente_enfermedad").insert(inserts);

      if (error) {
        console.error(error);
        setMensaje({ tipo: "error", texto: "Error al asignar enfermedades." });
      } else {
        setMensaje({ tipo: "success", texto: "✅ Enfermedades asignadas correctamente." });
        setSelectedEnfermedades([]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md border p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Asignar Enfermedades Crónicas</h2>

      <div className="space-y-4">
        {/* Paciente */}
        <div>
          <label className="block text-sm font-medium mb-1">Paciente</label>
          <Select
            options={pacienteOptions}
            value={selectedPaciente}
            onChange={setSelectedPaciente}
            placeholder="Selecciona un paciente..."
            className="text-sm"
          />
        </div>

        {/* Enfermedades */}
        <div>
          <label className="block text-sm font-medium mb-1">Enfermedades</label>
          <Select
            isMulti
            options={enfermedadOptions}
            value={selectedEnfermedades}
            onChange={setSelectedEnfermedades}
            placeholder="Selecciona enfermedades..."
            className="text-sm"
          />
        </div>

        {/* Botón */}
        <button
          onClick={handleAsignar}
          disabled={loading}
          className={`w-full py-2 rounded-md font-medium text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Asignando..." : "Asignar Enfermedades"}
        </button>

        {/* Mensaje */}
        {mensaje && (
          <div
            className={`mt-3 text-center text-sm font-medium ${
              mensaje.tipo === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {mensaje.texto}
          </div>
        )}
      </div>
    </div>
  );
};

export default AsignarEnfermedades;
