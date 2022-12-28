import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {InterProductos} from '../../../interface'
import './styles.css'
import { cargaVenta } from '../../functions/https';


export default function TotalVentasIndividual(){
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [venta , setVenta] = useState<InterProductos[]>([])
    const [precioTotal , setPrecioTotal] = useState<number>(0)
    const [cantidadTotal , setCantidadTotal] = useState<number>(0)

    useEffect(() =>{
        cargaVenta(id , setVenta , setPrecioTotal , setCantidadTotal)
    },[])

    return (
        <div className="containt100"> 
            <h1 className="centrado" style={{height:"10vh"}}>Venta N°{id}</h1>
            <div className="box-table-totales individual">
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th>Producto</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venta !== undefined && venta.map((n , i) =>  
                            <tr 
                                className="unidad-de-tabla-total-ventas" 
                                key={i} 
                            >
                                <td>{i+1}</td>
                                <td>{n.nombre}</td>
                                <td className='text-end'>{n.vendidos}</td>
                                <td className='text-end'>${n.precio * n.vendidos}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="barra-totales-ventas">
                <div className='table-total-ventas' style={{width:'70%'}}>Totales</div>
                <div className='table-valor-ventas' style={{width:'12%'}}>{cantidadTotal}</div>
                <div className='table-valor-ventas' style={{width:'18%'}}>${precioTotal}</div>
            </div>
        </div>
    )
}