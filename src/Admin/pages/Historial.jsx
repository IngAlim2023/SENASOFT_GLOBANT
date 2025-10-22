import SideBar from "../components/SideBar"


const Historial = () => {
  return (
    <div>
      {/* Sidebar con espacio unico */}
      <SideBar />

      {/* Contenido del Dashboard a la izquierda del sidebar */}
      <div className="ml-64 p-6">
        <h1 className="text-2xl font-bold mb-4">Historial</h1>
        {/* Aquí va el contenido del dashboard */}
      </div>
      
    </div>
  )
}

export default Historial
