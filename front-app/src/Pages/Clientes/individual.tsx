import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Venta , Cliente, DataFullCustomar } from '../../../interface';
import './styles.css'
import { getCliente } from '../../api/clientes';
import { DataOfTheCustomer } from '../../functions/clientes/obtenerDatosDeClientes';
import { useSelector } from 'react-redux';

export default function ClienteInterface(){
    const navigate = useNavigate()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    const [cliente , setCliente] = useState<Cliente>()
    const [fullCliente , setFullCliente] = useState<DataFullCustomar>() 

    useEffect(() =>{
        if(fullCliente === undefined) calculos()
        if(cliente === undefined) obtenerCliente()
    },[fullCliente , cliente , clientes])

    const obtenerCliente = () => {
        setCliente(clientes.filter(n => n.id === id)[0])
    }

    const calculos = async () => {
        const data:DataFullCustomar = await DataOfTheCustomer(id)
        setFullCliente(data)
    }

    if(cliente === undefined || fullCliente === undefined) return (<></>) 
    
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
                        <li>localidad: {fullCliente.localidad}</li>
                        <li>telefono: {cliente.telefono}</li>
                    </ul>
                </div>
                <div>
                    <span>
                        <h5>Estado del Cliente</h5>
                    </span>
                    <ul>
                        <li>debe: {cliente.debe}</li>
                        <li>cantidad de facturas sin pagar: {fullCliente.cantidad_de_facturas_sin_pagar}</li>
                        <li>debemos: {cliente.debe < 0 ? cliente.debe * -1 : 0}</li>
                        <li>cantidad de compras: {fullCliente.cantidad_de_compras}</li>
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
                        {fullCliente.ventas.length > 0 && 
                        fullCliente.ventas.map((n , i) =>  
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
                <div className='table-total-ventas' style={{width:'20%'}}>{fullCliente.ventas.length}</div>
                <div className='table-valor-ventas' style={{width:'20%'}}>0</div>
                <div className='table-valor-ventas' style={{width:'40%'}}>${fullCliente.valorVentasTotal / 2}</div>
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