import './styles.css'
import { Link } from "react-router-dom";

export default function Totales(){
    return (
        <div className="containt100 d-flex flex-column">
            <div className="box-links-totales flex-column centrado">
                <Link className="btn-Links-totales centrado" to="ventas">
                    <button className="btn">
                        Ventas
                    </button>
                </Link>
            </div>
        </div>
    )
}