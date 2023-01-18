import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { InterVentas } from '../../../interface';
import Data from './dataPrueba.json';
import './styles.css'
import { cargaVentas, valoresAbsolutosPorVenta } from '../../functions/data/ventas/index';

export default function Cliente(){
    //data personal
    const [apellido , setApellido] = useState<string>("")
    const [localidad , setLocalidad] = useState<string>("")
    const [telefono , setTelefono] = useState<string>("")
    const [debe , setDebe] = useState<string>("")
    const [cantidad_de_facturas_sin_pagar , setCantidad_de_facturas_sin_pagar] = useState<string>("")
    const [debemos , setDebemos] = useState<string>("")
    const [cantidad_de_compras , setCantidad_de_compras] = useState<string>("")
    const nombre:number = parseInt(useLocation().pathname.split('/')[3])
    const [valorVentasTotal , setValorVentasTotal] = useState<number>(0);
    const [cantidadPVT , setCantidadPVT] = useState<number>(0);

    const navigate = useNavigate()
    //ver bien como viene esto
    const [ventas , setVentas] = useState<InterVentas[]>(Data)
    //const [precioTotal , setPrecioTotal] = useState<number>(0)
    //const [cantidadTotal , setCantidadTotal] = useState<number>(0)

    useEffect(() =>{
        //cargaVentas(setVentas , setPrecioTotal , setCantidadTotal)
        if(cantidadPVT === 0) cargaTotales()
    },[])

    const cargaTotales = () => { 
        Data.map(n => {
            setValorVentasTotal(m => m + n.precio);
            setCantidadPVT(m => m + n.cantidad);
        })
    }

    //usar este como filtro y chau
    if(nombre !== undefined) 
    return (
        <div>
            <div className="box-data-cliente-totales">
                <div>
                    <span>
                        <h5>Datos Personales del Cliente</h5>
                    </span>
                    <ul>
                        <li>nombre: {nombre}</li>
                        <li>apellido: {apellido}</li>
                        <li>localidad: {localidad}</li>
                        <li>telefono: {telefono}</li>
                    </ul>
                </div>
                <div>
                    <span>
                        <h5>Estado del Cliente</h5>
                    </span>
                    <ul>
                        <li>debe: {debe}</li>
                        <li>cantidad de facturas sin pagar: {cantidad_de_facturas_sin_pagar}</li>
                        <li>debemos: {debemos}</li>
                        <li>cantidad de compras: {cantidad_de_compras}</li>
                    </ul>
                </div>
            </div>

            <div className="box-interaccion-directa-cliente">
                <div>
                    <Link to={`/Clientes/pagos/${nombre}`} className='btn'>
                        Agregar Pago
                    </Link>
                </div>
                <div>
                    <Link to="/Ventas" className='btn'>
                        Comenzar Venta
                    </Link>
                </div>
                <div>
                    <Link to={`/Clientes/acciones/${nombre}`} className='btn'>
                        Ediatar Datos del Cliente
                    </Link>
                </div>
            </div>

            <div className="barra-totales-ventas" style={{backgroundColor: "black" , color: 'white'}}>
                <div className='table-total-ventas' style={{width:'20%'}}>N°</div>
                <div className='table-valor-ventas' style={{width:'20%'}}>Cantid Prodct. V.</div>
                <div className='table-valor-ventas' style={{width:'40%'}}>Valor Venta</div>
                <div className='table-valor-ventas' style={{width:'20%'}}>Fecha</div>
            </div>
            <div className="box-table-totales" style={{height:'46vh'}}>
                <Table striped bordered hover>
                    <tbody>
                        {ventas.length > 0 && 
                        ventas.map((n , i) =>  
                            <tr 
                                className={`unidad-de-tabla-total-ventas ${!n.pagado ? 'venta-no-pagado' : ""}`}
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`/Totales/Ventas/${n.id}`)}}
                            >
                                <td style={{width:'20%'}}>{n.id}</td>
                                <td style={{width:'20%'}} className='text-end'>{n.cantidad}</td>
                                <td style={{width:'40%'}} className='text-end'>${n.precio}</td>
                                <td style={{width:'20%'}} className='text-end'>{n.id}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="barra-totales-ventas">
                <div className='table-total-ventas' style={{width:'20%'}}>{ventas.length}</div>
                <div className='table-valor-ventas' style={{width:'20%'}}>{cantidadPVT / 2}</div>
                <div className='table-valor-ventas' style={{width:'40%'}}>${valorVentasTotal / 2}</div>
                <div className='table-valor-ventas' style={{width:'20%'}}>under</div>
            </div>

            <div className="centrado" style={{height: '20vh'}}>
                <Link to="/Clientes" className='btn btn-danger'>
                    Volver
                </Link>
            </div>

        </div>
    )
}