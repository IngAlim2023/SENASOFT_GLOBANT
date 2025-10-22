import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import supabase from "../../../api/supabase";

const FormPacientes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [regimenes, setRegimenes] = useState([]);
  const [epsList, setEpsList] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuariosRes, regimenesRes, epsRes, municipiosRes] = await Promise.all([
          supabase.from("usuario").select("*").eq("perfil_id", 3),
          supabase.from("regimen").select("id, tipo"),
          supabase.from("eps").select("id, nombre"),
          supabase.from("municipios").select("id, nombre"),
        ]);

        if (usuariosRes.data) setUsuarios(usuariosRes.data);
        if (regimenesRes.data) setRegimenes(regimenesRes.data);
        if (epsRes.data) setEpsList(epsRes.data);
        if (municipiosRes.data) setMunicipios(municipiosRes.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  // Opciones para selects
  const usuarioOptions = usuarios.map((u) => ({
    value: u.id,
    label: `${u.nombre} (${u.documento})`,
  }));

  const regimenOptions = regimenes.map((r) => ({
    value: r.id,
    label: r.tipo,
  }));

  const epsOptions = epsList.map((e) => ({
    value: e.id,
    label: e.nombre,
  }));

  const municipioOptions = municipios.map((m) => ({
    value: m.id,
    label: m.nombre,
  }));

  const vulnerabilidadOptions = [
    { value: "BAJO", label: "Bajo" },
    { value: "MEDIO", label: "Medio" },
    { value: "ALTO", label: "Alto" },
  ];

  const onSubmit = async (formData) => {
    const paciente = {
      usuario_id: formData.paciente?.value,
      regimen_id: formData.regimen?.value || null,
      eps_id: formData.eps?.value || null,
      municipio_id: formData.municipio?.value || null,
      nivel_vulnerabilidad: formData.vulnerabilidad?.value || null,
    };

    const { data, error } = await supabase
      .from("pacientes")
      .insert(paciente)
      .select();

    if (error) {
      console.error("Error insertando paciente:", error);
      alert("❌ Error al crear el paciente.");
    } else {
      console.log("Paciente creado:", data);
      alert("✅ Paciente creado con éxito.");
      reset(); // Limpia el formulario
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Paciente */}
        <div>
          <label className="block mb-1 font-medium">Paciente</label>
          <Controller
            name="paciente"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} options={usuarioOptions} placeholder="Elige un paciente..." />
            )}
          />
        </div>

        {/* Régimen */}
        <div>
          <label className="block mb-1 font-medium">Régimen</label>
          <Controller
            name="regimen"
            control={control}
            render={({ field }) => (
              <Select {...field} options={regimenOptions} placeholder="Selecciona el régimen..." />
            )}
          />
        </div>

        {/* EPS */}
        <div>
          <label className="block mb-1 font-medium">EPS</label>
          <Controller
            name="eps"
            control={control}
            render={({ field }) => (
              <Select {...field} options={epsOptions} placeholder="Selecciona la EPS..." />
            )}
          />
        </div>

        {/* Municipio */}
        <div>
          <label className="block mb-1 font-medium">Municipio</label>
          <Controller
            name="municipio"
            control={control}
            render={({ field }) => (
              <Select {...field} options={municipioOptions} placeholder="Selecciona el municipio..." />
            )}
          />
        </div>

        {/* Nivel de vulnerabilidad */}
        <div>
          <label className="block mb-1 font-medium">Nivel de vulnerabilidad</label>
          <Controller
            name="vulnerabilidad"
            control={control}
            render={({ field }) => (
              <Select {...field} options={vulnerabilidadOptions} placeholder="Selecciona el nivel..." />
            )}
          />
        </div>

        {/* Botón enviar */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full"
        >
          Crear paciente
        </button>
      </form>
    </div>
  );
};

export default FormPacientes;
