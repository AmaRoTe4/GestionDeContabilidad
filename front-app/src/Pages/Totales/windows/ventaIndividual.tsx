import { Table } from "react-bootstrap"
import "../styles.css"
import { useEffect, useState } from "react"
import { Cliente, ProductoDeVenta , Venta } from "../../../../interface"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getVenta } from "../../../api/ventas"
import { ordenarPorDueda } from "../../../functions/ventas/ordenar"
import { obtenerProducto } from "../../../functions/productos/obtenerProducto"

export default function index(){
    const navigate = useNavigate()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [venta , setVenta] = useState<Venta>({
        id:0,
        createdAt:"",
        cliente: 0,
        articulos: [],
        tipo_de_venta: "",
        valor_total: 0,
        valor_abonado: 0
    }) 
    const [productos , setProductos] = useState<ProductoDeVenta[]>([]) 
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    //@ts-ignore
    const allProductos:Producto[] = useSelector((state) => state.productos)

    useEffect(() => {
        obtenerVenta()
    },[])

    const obtenerVenta = async () => {
        const aux:Venta | undefined = await getVenta(id)
        if(aux == undefined) return
        setVenta(aux)
        setProductos(JSON.parse(`${aux.articulos}`))
    }

    return (
        <div>
            <div className="d-flex align-items-center flex-column" style={{width:"100vw" , height:"40vh"}}>

                <h1>Ventas N°{id}</h1>
                <div className="d-flex" style={{width:"100vw" , height:"100%"}}>
                    <div className="d-flex flex-column" style={{width:"160px" , height:"100%"}}>
                        <p style={{margin: 0 , marginLeft: 10}}>
                            Nombre de Cliente: 
                        </p>
                        <p style={{margin: 0 , marginLeft: 10}}>
                            Apellido de Cliente: 
                        </p>
                        <p style={{margin: 0 , marginLeft: 10}}>
                            Fecha de Venta: 
                        </p>
                        <p style={{margin: 0 , marginLeft: 10}}>
                            Valor Total: 
                        </p>
                        <p style={{margin: 0 , marginLeft: 10}}>
                            Valor Abonado: 
                        </p>
                        <p style={{margin: 0 , marginLeft: 10}}>
                            Diferencia: 
                        </p>
                        <p style={{margin: 0 , marginLeft: 10}}>
                            Estado: 
                        </p>
                    </div>
                    {venta?.cliente && 
                    <div className="d-flex flex-column" style={{width:"300px" , height:"100%"}}>
                        <b style={{margin: 0 , marginLeft: 10}}>
                                {clientes.filter(n => n.id === venta.cliente)[0]?.nombre}
                        </b>
                        <b style={{margin: 0 , marginLeft: 10}}>
                                {clientes.filter(n => n.id === venta.cliente)[0]?.apellido}
                        </b>
                        <b style={{margin: 0 , marginLeft: 10}}>
                                {venta?.createdAt}
                        </b>
                        <b style={{margin: 0 , marginLeft: 10}}>
                                ${venta.valor_total}
                        </b>
                        <b style={{margin: 0 , marginLeft: 10}}>
                                ${venta.valor_abonado}
                        </b>
                        <b style={{margin: 0 , marginLeft: 10}}>
                            ${venta.valor_total - venta.valor_abonado}
                        </b>
                        <b style={{margin: 0 , marginLeft: 10}}>
                            {venta.valor_total - venta.valor_abonado > 0 ? "Debe" : "Pagado"}
                        </b>
                    </div>}
                </div>
            </div>
            <div style={{width:"100vw" , maxHeight: "50vh" , height: "50vh" , overflowX:"hidden" , overflowY:"auto"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th>Nombre</th>
                            <th className='text-end'>Cantidad</th>
                            <th className="text-end">Precio</th>
                            <th className="text-end">Total Por Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((n ,i ) => 
                            <tr key={i} >
                                <th>{i + 1}</th>
                                <th>{obtenerProducto(n.id , allProductos)}</th>
                                <th className='text-end'>{n.cantidad}</th>    
                                <th className="text-end">${n.precio}</th>
                                <th className="text-end">${n.precio * n.cantidad}</th>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="mt-2 mb-2 centrado">
                <Link className="btn btn-danger" to="/Totales/Ventas">
                    Volver
                </Link>
            </div>
        </div>
    )
}