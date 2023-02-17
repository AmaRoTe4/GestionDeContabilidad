import { useEffect, useState } from "react";
import { Cliente, VentanaDeVenta } from "../../../interface";
import { getAllClientes } from "../../api/clientes";
import { filtroNombre } from "../../functions/clientes/obtenerClientes";
import '../../Pages/Ventas/interfaces/styles.css'
import { useSelector } from "react-redux";

interface Props {
    data:string,
    localidad:number,
    cliente:Cliente, 
    setCliente:React.Dispatch<React.SetStateAction<Cliente>>
}


export default function Clientes({data , localidad , cliente , setCliente}: Props){
    const [clientes , setClientes] = useState<Cliente[]>([])
    //@ts-ignore
    const id_clientes_usados:number[] = useSelector((state) => state.sales).map(n => n.id_cliente)
    //@ts-ignore
    const allClientes:Cliente[] = useSelector((state) => state.clientes)
    
    useEffect(() => {
        allData()
    },[localidad , data , allClientes])

    const allData = async () => {
        setClientes(
            filtroNombre(
                data , 
                localidad , 
                allClientes.filter(n => 
                    !(id_clientes_usados.includes(
                        n.id !== undefined 
                        ? n.id 
                        : 0)
                    )
                )
            )
        );
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