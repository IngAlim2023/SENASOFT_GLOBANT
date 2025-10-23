import { useEffect, useState } from "react";
import supabase from "../../../api/supabase";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const FormPedidos = () => {
  const { control, handleSubmit, register, reset, watch } = useForm();
  const [pacientes, setPacientes] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [{ data: pac }, { data: meds }] = await Promise.all([
        supabase.from("pacientes").select("id, usuario(nombre)"),
        supabase.from("medicamentos").select("id, nombre"),
      ]);
      setPacientes(pac || []);
      setMedicamentos(meds || []);
    };
    loadData();
  }, []);

  const pacienteOptions = pacientes.map(p => ({
    value: p.id,
    label: p.usuario?.nombre || `Paciente #${p.id}`,
  }));

  const medicamentoOptions = medicamentos.map(m => ({
    value: m.id,
    label: m.nombre,
  }));

  const estadoOptions = [
    { value: "pendiente", label: "Pendiente" },
    { value: "en_ruta", label: "En ruta" },
    { value: "entregado", label: "Entregado" },
    { value: "fallido", label: "Fallido" },
  ];

  const addDetalle = (medicamento, cantidad) => {
    if (!medicamento || !cantidad) return;
    setDetalles(prev => [
      ...prev,
      { medicamento_id: medicamento.value, nombre: medicamento.label, cantidad },
    ]);
  };

  const removeDetalle = (index) =>
    setDetalles(detalles.filter((_, i) => i !== index));

  const onSubmit = async (formData) => {
    const { paciente, direccion_entrega, prioridad, estado } = formData;

    if (detalles.length === 0) {
      alert("Agrega al menos un medicamento al pedido.");
      return;
    }

    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .insert([
        {
          paciente_id: paciente.value,
          direccion_entrega,
          prioridad: parseInt(prioridad),
          estado: estado.value,
        },
      ])
      .select("id")
      .single();

    if (pedidoError) {
      console.error(pedidoError);
      alert("Error al crear pedido");
      return;
    }

    const detallesInsert = detalles.map((d) => ({
      pedido_id: pedido.id,
      medicamento_id: d.medicamento_id,
      cantidad: d.cantidad,
    }));

    const { error: detalleError } = await supabase
      .from("pedido_detalle")
      .insert(detallesInsert);

    if (detalleError) {
      console.error(detalleError);
      alert("Error al agregar medicamentos");
      return;
    }

    alert("Pedido creado con éxito ✅");
    reset();
    setDetalles([]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-5 rounded-md shadow-md border">
      <h2 className="text-lg font-semibold text-gray-700">Crear nuevo pedido</h2>

      {/* Paciente */}
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

      {/* Dirección */}
      <div>
        <label className="block text-sm font-medium mb-1">Dirección de entrega</label>
        <input {...register("direccion_entrega")} type="text" className="w-full border rounded-md px-3 py-2" placeholder="Ej. Calle 123 #45-67" />
      </div>

      {/* Prioridad + Estado */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Prioridad</label>
          <input {...register("prioridad")} type="number" min="1" max="5" className="w-full border rounded-md px-3 py-2" />
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

      {/* Detalle de medicamentos */}
      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Medicamentos del pedido</h3>
        <div className="flex gap-2 mb-3">
          <Controller
            name="medicamento"
            control={control}
            render={({ field }) => (
              <Select {...field} options={medicamentoOptions} placeholder="Seleccionar medicamento..." />
            )}
          />
          <input
            {...register("cantidad")}
            type="number"
            min="1"
            className="w-24 border rounded-md px-2 py-1"
            placeholder="Cant."
          />
          <button
            type="button"
            onClick={() => addDetalle(watch("medicamento"), watch("cantidad"))}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            ➕ Agregar
          </button>
        </div>

        {detalles.length > 0 && (
          <ul className="border rounded-md divide-y max-h-40 overflow-y-auto">
            {detalles.map((d, i) => (
              <li key={i} className="flex justify-between p-2 text-sm">
                <span>{d.nombre} — {d.cantidad} unid.</span>
                <button type="button" onClick={() => removeDetalle(i)} className="text-red-500 hover:text-red-700">✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md">
        Guardar Pedido
      </button>
    </form>
  );
};

export default FormPedidos;
