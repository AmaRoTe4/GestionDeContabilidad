import { useState } from 'react';
import './styles.css'
import { Link, useNavigate } from "react-router-dom";

export default function Totales(){
    const navigate = useNavigate();
    const [cliente , setCliente] = useState<number>(1)
    const clientes:number[] = [
        1,2,3
    ]
    
    return (
        <div className="containt100 centrado d-flex flex-column">
            <div className="box-buscador-productos">
                <input placeholder="Clientes" />
                {clientes.length > 0 && 
                <ul>
                    {clientes.map((n , i) => 
                        <li 
                            key={i} 
                            onClick={(e) => {e.preventDefault(); setCliente(n)}}
                        >
                            <p>
                                {n}
                            </p>
                        </li>
                    )}
                </ul>}
            </div>
            {cliente !== 1 && <div className="box-links-totales flex-column centrado">
                <Link className="btn-Links-totales centrado" to={`VentasIndividuales/${cliente}`}>
                    <button className="btn">
                        Todas las Ventas de {cliente}
                    </button>
                </Link>
            </div>}
            <div className="box-links-totales flex-column centrado">
                <Link className="btn-Links-totales centrado" to="ventas">
                    <button className="btn">
                        Todas las Ventas
                    </button>
                </Link>
            </div>
        </div>
    )
}