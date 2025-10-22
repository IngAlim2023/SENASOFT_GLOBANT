import { useEffect, useState } from "react";
import supabase from "../../../api/supabase";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const FormPedidos = () => {
  const { control, handleSubmit, register, reset } = useForm();
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const loadPacientes = async () => {
      const { data, error } = await supabase
        .from("pacientes")
        .select("id, usuario(nombre)");
      if (!error) setPacientes(data);
    };
    loadPacientes();
  }, []);

  const pacienteOptions = pacientes.map((p) => ({
    value: p.id,
    label: p.usuario?.nombre || `Paciente #${p.id}`,
  }));

  const onSubmit = async (formData) => {
    const { error } = await supabase.from("pedidos").insert([
      {
        paciente_id: formData.paciente.value,
        direccion_entrega: formData.direccion_entrega,
        prioridad: parseInt(formData.prioridad),
        estado: formData.estado.value,
      },
    ]);
    if (!error) {
      alert("Pedido creado con éxito");
      reset();
    } else {
      console.error(error);
      alert("Error al crear el pedido");
    }
  };

  const estadoOptions = [
    { value: "pendiente", label: "Pendiente" },
    { value: "en_ruta", label: "En ruta" },
    { value: "entregado", label: "Entregado" },
    { value: "fallido", label: "Fallido" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-5 rounded-md shadow-md border"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        Crear nuevo pedido
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Paciente</label>
        <Controller
          name="paciente"
          control={control}
          render={({ field }) => (
            <Select {...field} options={pacienteOptions} placeholder="Seleccione paciente..." />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dirección de entrega</label>
        <input
          {...register("direccion_entrega")}
          type="text"
          className="w-full border rounded-md px-3 py-2"
          placeholder="Ej. Calle 123 #45-67"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Prioridad</label>
          <input
            {...register("prioridad")}
            type="number"
            min="1"
            max="5"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Estado</label>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <Select {...field} options={estadoOptions} placeholder="Seleccione estado..." />
            )}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
      >
        Guardar Pedido
      </button>
    </form>
  );
};

export default FormPedidos;
