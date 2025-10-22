//button de nuevo pedido
import { Link } from "react-router-dom";
const ButtonNuevoPedido = () => {
  return (
    <Link
        to="/inicio/nuevo-pedido"
        className="bg-white  text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        Nuevo Pedido
      </Link>
  );
}
export default ButtonNuevoPedido;