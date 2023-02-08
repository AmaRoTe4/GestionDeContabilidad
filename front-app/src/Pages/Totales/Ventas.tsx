import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import {InterProductos} from '../../../interface'
import Data from './data.json'
import './styles.css'

export default function TotalVentasIndividual(){
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const navigate = useNavigate()
    const [venta , setVenta] = useState<InterProductos[]>(Data)
    const [precioTotal , setPrecioTotal] = useState<number>(0)
    const [cantidadTotal , setCantidadTotal] = useState<number>(0)

    useEffect(() =>{

    },[])

    return (
        <div className="containt100"> 
            <h1 className="centrado" style={{height:"10vh"}}>Todas las Ventas</h1>
            <div className="barra-totales-ventas" style={{backgroundColor: "black" , color: 'white'}}>
                <div className='table-total-ventas' style={{width:'20%'}}>N°</div>
                <div className='table-valor-ventas text-end' style={{width:'40%'}}>Nombre</div>
                <div className='table-valor-ventas text-end' style={{width:'20%'}}>Cantidad</div>
                <div className='table-valor-ventas text-end' style={{width:'20%'}}>Valor</div>
            </div>
            <div className="box-table-totales individual">
                <Table striped bordered hover >
                    <tbody>
                        {venta !== undefined && venta.map((n , i) =>  
                            <tr 
                                className="unidad-de-tabla-total-ventas" 
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`/Totales/Ventas/${i + 1}`)}}
                            >
                                <td style={{width:'20%'}}>{i+1}</td>
                                <td style={{width:'40%'}} className='text-end'>{n.nombre}</td>
                                <td style={{width:'20%'}} className='text-end'>{n.vendidos}</td>
                                <td style={{width:'20%'}} className='text-end'>${n.precio * n.vendidos}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="barra-totales-ventas">
                <div className='table-total-ventas' style={{width:'20%'}}>Totales</div>
                <div className='table-total-ventas' style={{width:'40%' , content:""}}></div>
                <div className='table-valor-ventas text-end' style={{width:'20%'}}>{cantidadTotal}</div>
                <div className='table-valor-ventas text-end' style={{width:'20%'}}>${precioTotal}</div>
            </div>
        </div>
    )
}