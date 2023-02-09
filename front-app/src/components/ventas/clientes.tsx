import { useEffect, useState } from "react";
import { Cliente } from "../../../interface";
import { getAllClientes } from "../../api/clientes";
import { filtroNombre } from "../../functions/clientes/obtenerClientes";
import '../../Pages/Ventas/interfaces/styles.css'

interface Props {
    data:string,
    localidad:number,
    cliente:Cliente, 
    setCliente:React.Dispatch<React.SetStateAction<Cliente>>
}


export default function Clientes({data , localidad , cliente , setCliente}: Props){
    const [clientes , setClientes] = useState<Cliente[]>([])
    
    useEffect(() => {
        allData()
    },[localidad , data])

    const allData = async () => {
        let cliente:Cliente[] | undefined = await getAllClientes()
        if(cliente === undefined) return 
        setClientes(filtroNombre(data , localidad , cliente))
    } 

    return (
        <ul>
            {clientes.map((n , i) => 
                <li 
                    key={i} 
                    style={{
                        border: `${cliente.nombre === n.nombre ? "rgb(55 255 105)" : ""} solid 1px` , 
                        backgroundColor: `${cliente.nombre === n.nombre ? "rgb(105 255 15)" : "rgb(255 255 255)"}`
                    }}
                    onClick={(e) => {e.preventDefault(); setCliente(n)}}
                >
                    <p>
                        {n.nombre} {n.apellido}
                    </p>
                </li>
            )}
        </ul>
    )
}