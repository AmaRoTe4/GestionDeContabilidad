import { Table } from "react-bootstrap"
import "../styles.css"
import { useEffect, useState } from "react"
import { Cliente, Producto, Venta } from "../../../../interface"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getAllVentas } from "../../../api/ventas"
import { obtenerPorDia } from "../../../functions/ventas/obtenerPorDia"

export default function index(){
    const navigate = useNavigate()
    //@ts-ignore
    const [valorVenta , setValorVenta] = useState<number>(0) 
    const [valorAbonado , setValorAbonado] = useState<number>(0) 
    const [ventas , setVentas] = useState<Venta[]>([]) 
    const [ventasDay , setVentasDay] = useState<Venta[]>([]) 
    const [fechas , setFechas] = useState<string[]>([]) 
    const [fecha , setFecha] = useState<string>("") 
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)

    useEffect(() => {
        if(ventas.length === 0) obtenerData()
        modificarVentas()
    },[ventas])

    const obtenerData = async (dia:string = "") => {
        if(ventas.length === 0){
            const aux:Venta[] | undefined = await getAllVentas()
            if(aux == undefined) return
            let auxFechas:string[] = aux.map(n => n.createdAt ?? "")
            setFechas(auxFechas.filter((n ,i) => {
                return i === auxFechas.indexOf(n)
            }))
            setFecha(auxFechas[0])
            setVentas(aux)
        }
    }
    
    const modificarVentas = (value:string = "") => {
        if(value !== "") setFecha(value)
        let aux:Venta[] = obtenerPorDia(ventas , value === "" ? fecha : value)
        setVentasDay(aux)
        totales(aux)     
    }

    const totales = (ventas:Venta[]) => {
        if(ventasDay.length === 0) return
        let auxVenta = ventas.map((n) => n.valor_total)
        let auxAbonado = ventas.map((n) => n.valor_abonado)
        
        setValorVenta(auxVenta.reduce((total , n) => total + n))
        setValorAbonado(auxAbonado.reduce((total , n) => total + n))    
    }

    if(clientes.length === 0) return <></>

    return (
        <div>
            <div className="d-flex align-items-center flex-column" style={{width:"100vw" , height:"20vh"}}>

                <h1>{fecha}</h1>

            </div>
            <div className="d-flex align-items-start flex-column justify-content-center" style={{width:"100vw" , height:"10vh"}}>

                <select className="ms-3 selecFecha" onChange={e => {modificarVentas(e.target.value)}}>
                    {fechas && fechas.map((n , i) => 
                        <option key={i}>
                            {n}
                        </option>
                    )}
                </select>

            </div>
            <div style={{width:"100vw" , maxHeight: "60vh"}}>
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
                    <tbody style={{overflowX: "hidden" , overflowY: "auto" , maxHeight: '50vh'}}>
                        {ventasDay.map((n ,i ) => 
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
                    <thead>
                        <tr className='table-info'>
                            <th>#</th>
                            <th>Total</th>
                            <th className="text-end" style={{content: ""}}></th>
                            <th className='text-end'>${valorVenta}</th>
                            <th className="text-end">${valorAbonado}</th>
                            <th className="text-end">${valorVenta - valorAbonado}</th>
                        </tr>
                    </thead>
                </Table>
            </div>
        </div>
    )
}