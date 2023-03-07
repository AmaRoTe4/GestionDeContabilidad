import { Table } from "react-bootstrap"
import "../styles.css"
import { useEffect, useState } from "react"
import { Cliente, Producto, Venta } from "../../../../interface"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getAllVentas } from "../../../api/ventas"
import { ordenarPorDueda } from "../../../functions/ventas/ordenar"

export default function index(){
    const navigate = useNavigate()
    //@ts-ignore
    const [ventas , setVentas] = useState<Venta[]>([]) 
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)



    useEffect(() => {
        obtenerVentas()
    },[])

    const obtenerVentas = async () => {
        const aux:Venta[] | undefined = await getAllVentas()
        if(aux == undefined) return
        setVentas(ordenarPorDueda(aux))
    }

    return (
        <div>
            <div className="d-flex align-items-center flex-column" style={{width:"100vw" , height:"20vh"}}>

                <h1>Ventas</h1>

            </div>
            <div style={{width:"100vw" , maxHeight: "70vh" , overflowX:"hidden" , overflowY:"auto"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th>Cliente</th>
                            <th className="text-end">Fecha</th>
                            <th className='text-end'>Valor de Venta</th>
                            <th className="text-end">Valor abonado</th>
                            <th className="text-end">Diferencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((n ,i ) => 
                            <tr 
                                className={`${n.valor_abonado !== n.valor_total ? "ColorRed" : ""} hoverPointer`}
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`/Totales/Ventas/${n.id}`)}}>
                                <td>{i+1}</td>
                                <td>{clientes.filter(m => m.id === n.cliente)[0].nombre} {clientes.filter(m => m.id === n.cliente)[0].apellido}</td>
                                <td className="text-end">{n.createdAt}</td>
                                <td className='text-end'>${n.valor_total}</td>
                                <td className="text-end">${n.valor_abonado}</td>
                                <td className="text-end">${n.valor_total - n.valor_abonado}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}