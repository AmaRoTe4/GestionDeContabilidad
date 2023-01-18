import { useState } from 'react';
import './styles.css'
import { Link, useNavigate } from "react-router-dom";

export default function Totales(){
    const navigate = useNavigate();
    const [text , setText] = useState<string>('')
    const [localidad , setLocalidad] = useState<string>('')
    const [localidades] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])
    const [cliente , setCliente] = useState<number>(1)
    const clientes:number[] = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
    ]
    
    return (
        <div className="containt100 centrado d-flex flex-column">
            {/*<div className="box-buscador-productos">
                <input 
                    placeholder="Clientes" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <select
                    value={localidad}
                    name="select" 
                    onChange={(e) => {e.preventDefault(); setLocalidad(e.target.value)}}>
                        {localidades.map((n , i) => 
                        <option key={i} value={n}>
                            {n}
                        </option>
                    )}
                </select>
                {clientes.length > 0 && text !== "" && 
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
            </div>*/}
            <div style={{height: 'auto' , width: '100vw' , marginTop: '10vh'}}>
                {/*{cliente !== 1 && <div className="box-links-totales flex-column centrado">
                    <Link className="btn-Links-totales centrado" to={`VentasIndividuales/${cliente}`}>
                        <button className="btn">
                            Todas las Compras de {cliente}
                        </button>
                    </Link>
                </div>}*/}
                <div className="box-links-totales flex-column centrado">
                    <Link className="btn-Links-totales centrado" to="ventas">
                        <button className="btn">
                            Todas las Ventas
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}