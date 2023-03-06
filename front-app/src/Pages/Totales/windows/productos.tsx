import { Table } from "react-bootstrap"
import "../styles.css"
import { useEffect, useState } from "react"
import { Producto } from "../../../../interface"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { ordenarCantidad } from "../../../functions/productos/ordenar"

export default function index(){
    const [vistas , setVistas] = useState<Producto[]>([])
    const navigate = useNavigate()
    //@ts-ignore
    const productos:Producto[] = useSelector((state) => state.productos)
    useEffect(() => {
        if(productos === undefined) return 
        setVistas(ordenarCantidad(productos))
    },[])

    return (
        <div>
            <div className="d-flex align-items-center flex-column" style={{width:"100vw" , height:"20vh"}}>

                <h1>Clientes</h1>

            </div>
            <div style={{width:"100vw" , maxHeight: "70vh" , overflowX:"hidden" , overflowY:"auto"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th>Producto</th>
                            <th className='text-end'>Codigo</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vistas.map((n ,i ) => 
                            <tr 
                                className={`${n.cantidad === 0 ? "ColorRed" : ""} hoverPointer`}
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`/Productos/producto/${n.id}`)}}>
                                <td>{i+1}</td>
                                <td>{n.nombre}</td>
                                <td className='text-end'>{n.codigo}</td>
                                <td className='text-end'>{n.cantidad}</td>
                                <td className='text-end'>${n.precio}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}