import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { InterVentas } from '../../../interface';
import './styles.css'
import { cargaVentas } from '../../functions/data/ventas/index';

export default function TotalVentas(){
    const navigate = useNavigate()
    const [ventas , setVentas] = useState<InterVentas[]>([])
    const [precioTotal , setPrecioTotal] = useState<number>(0)
    const [cantidadTotal , setCantidadTotal] = useState<number>(0)

    useEffect(() =>{
        cargaVentas(setVentas , setPrecioTotal , setCantidadTotal)
    },[])

    return (
        <div className="containt100"> 
            <div className="box-table-totales">
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th className="text-end">Cantid Prodct. V.</th>
                            <th className="text-end">Valor Venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.length > 0 && 
                        ventas.map((n , i) =>  
                            <tr 
                                className="unidad-de-tabla-total-ventas" 
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`${n.id}`)}}>
                                <td>{n.id}</td>
                                <td className='text-end'>{n.cantidad}</td>
                                <td className='text-end'>${n.precio}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="barra-totales-ventas">
                <div className='table-total-ventas' style={{width:'10%'}}>Totales</div>
                <div className='table-valor-ventas' style={{width:'52%'}}>{cantidadTotal}</div>
                <div className='table-valor-ventas' style={{width:'38%'}}>${precioTotal}</div>
            </div>
        </div>
    )
}