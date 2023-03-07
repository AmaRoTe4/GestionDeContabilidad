import "./styles.css"
import { Link } from "react-router-dom"

export default function Totales(){
    return (
        <div className="d-flex align-items-center flex-column">
            
            <h1 className="mt-3 mb-3">Totales</h1>

            <div className="box-of-links-totales">
                <Link className="btn-totales" to="/Totales/ventas">
                    <p>
                        Ventas
                    </p>
                </Link>
                <Link className="btn-totales" to="/Totales/clientes">
                    <p>
                        Clientes
                    </p>
                </Link>
                <Link className="btn-totales" to="/Totales/productos">
                    <p>
                        Productos
                    </p>
                </Link>
            </div>

        </div>
    )
}