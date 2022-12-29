import { useState } from 'react';
import '../styles.css'

interface Props{
    id:number
}

export default function SeleccionDeCliente({id}:Props){
    const [cliente , setCliente] = useState<string>("")
    const [clientes] = useState<string[]>([
        "primeroaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "segundo",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
        "tercero",
    ])
    const [categorias] = useState<string[]>([
        "",
        "Malabrigo",
        "Reconquista",
        "Vera",
    ])

    return (
        <div className="boxSeleccionDeCliente">
            <h3>Seleccion al cliente</h3>
            <div className="centrado">
                <label>Localidades</label>
                <select
                    name="select" 
                    onChange={(e) => {e.preventDefault();}}>
                        {categorias.map((n , i) => 
                        <option key={i} value={n}>
                            {n}
                        </option>
                    )}
                </select>
            </div>
            <input />
            <ul>
                {clientes.map((n , i) => 
                    <li 
                        key={i} 
                        style={{
                            border: `${cliente === n ? "red" : ""} solid 1px` , 
                            backgroundColor: `${cliente === n ? "rgb(235 235 235)" : "rgb(255 255 255)"}`
                        }}
                        onClick={(e) => {e.preventDefault(); setCliente(n)}}
                    >
                        <p>
                            {n}
                        </p>
                    </li>
                )}
            </ul>
            <button 
                onClick={(e) => {e.preventDefault();}}
            >
                Aceptar
            </button>
        </div>
    )
}