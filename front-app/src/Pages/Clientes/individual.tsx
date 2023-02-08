import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Venta , Cliente, DataFullCustomar } from '../../../interface';
import './styles.css'
import { getCliente } from '../../api/clientes';
import { DataOfTheCustomer } from '../../functions/clientes/obtenerDatosDeClientes';

export default function ClienteInterface(){
    const navigate = useNavigate()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    
    const [cliente , setCliente] = useState<Cliente>()
    
    const [localiad , setLocalidad] = useState<string>("")
    const [cantidad_de_facturas_sin_pagar , setCantidad_de_facturas_sin_pagar] = useState<number>(0)
    const [cantidad_de_compras , setCantidad_de_compras] = useState<number>(0)
    const [valorVentasTotal , setValorVentasTotal] = useState<number>(0);
    const [cantidadPVT , setCantidadPVT] = useState<number>(0);
    const [ventas , setVentas] = useState<Venta[]>([])

    useEffect(() =>{
        if(cliente === undefined) obtenerCliente()
    },[cliente])

    const obtenerCliente = async () => {
        const data:Cliente | undefined = await getCliente(id)
        if(data !== undefined) setCliente(data)
    }

    const calculos = async () => {
        const data:DataFullCustomar = await DataOfTheCustomer(id)
        setCantidad_de_facturas_sin_pagar(data.cantidad_de_facturas_sin_pagar)
        setCantidad_de_compras(data.cantidad_de_compras)
        setValorVentasTotal(data.valorVentasTotal)
        setCantidadPVT(data.cantidadPVT)
        setVentas(data.ventas)
        setLocalidad(data.localidad)
    }

    if(cliente !== undefined) 
    return (
        <div>
            <div className="box-data-cliente-totales">
                <div>
                    <span>
                        <h5>Datos Personales del Cliente</h5>
                    </span>
                    <ul>
                        <li>nombre: {cliente.nombre}</li>
                        <li>apellido: {cliente.apellido}</li>
                        <li>localidad: {cliente.localidad}</li>
                        <li>telefono: {cliente.telefono}</li>
                    </ul>
                </div>
                <div>
                    <span>
                        <h5>Estado del Cliente</h5>
                    </span>
                    <ul>
                        <li>debe: {cliente.debe}</li>
                        <li>cantidad de facturas sin pagar: {cantidad_de_facturas_sin_pagar}</li>
                        <li>debemos: {cliente.debe < 0 ? cliente.debe * -1 : 0}</li>
                        <li>cantidad de compras: {cantidad_de_compras}</li>
                    </ul>
                </div>
            </div>

            <div className="box-interaccion-directa-cliente">
                <div>
                    <Link to={`/Clientes/pagos/${cliente.nombre}`} className='btn'>
                        Agregar Pago
                    </Link>
                </div>
                <div>
                    <Link to="/Ventas" className='btn'>
                        Comenzar Venta
                    </Link>
                </div>
                <div>
                    <Link to={`/Clientes/acciones/${id}`} className='btn'>
                        Editar Datos del Cliente
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
                                className={`
                                    unidad-de-tabla-total-ventas 
                                    ${!(n.valor_abonado === n.valor_total) 
                                    ? 'venta-no-pagado' 
                                    : ""}`
                                }
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`/Totales/Ventas/${n.id}`)}}
                            >
                                <td style={{width:'20%'}}>{n.id}</td>
                                <td style={{width:'20%'}} className='text-end'>
                                    {/*{n.cantidad}*/}
                                    0
                                </td>
                                <td style={{width:'40%'}} className='text-end'>$
                                    {/*{n.precio}*/}
                                    0
                                </td>
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