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
    ])

    return (
        <div className="boxSeleccionDeCliente">
            <h3>Seleccion al cliente</h3>
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