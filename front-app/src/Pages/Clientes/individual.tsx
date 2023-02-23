import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Venta , Cliente, DataFullCustomar } from '../../../interface';
import './styles.css'
import { getCliente } from '../../api/clientes';
import { DataOfTheCustomer } from '../../functions/clientes/obtenerDatosDeClientes';
import { useSelector } from 'react-redux';
import { nombreLocalidadId } from '../../functions/localidad/obtenerLocalidad';
import { TablaDeVentas } from '../../components/clientes/tablaDeVentas';
import { useDispatch } from 'react-redux';
import { fetchAllClientes } from '../../store/elements/clientes';

export default function ClienteInterface(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    //@ts-ignore
    const localidades:Cliente[] = useSelector((state) => state.localidades)
    const [cliente , setCliente] = useState<Cliente>()
    const [fullCliente , setFullCliente] = useState<DataFullCustomar>() 
    const [intentos , setIntentos] = useState<number>(0)

    useEffect(() =>{
        if(intentos < 1) dataRedux()
        if(intentos === 1 && fullCliente === undefined) calculos()
        if(intentos === 1 && cliente === undefined) obtenerCliente()
    },[fullCliente , cliente , clientes , intentos])
	
    const dataRedux = async () => {
        setIntentos(intentos + 1)
        //@ts-ignore
        await dispatch(fetchAllClientes())
    }

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
                        <li>localidad: {nombreLocalidadId(cliente.localidad , localidades)}</li>
                        <li>telefono: {cliente.telefono}</li>
                    </ul>
                </div>
                <div>
                    <span>
                        <h5>Estado del Cliente</h5>
                    </span>
                    <ul>
                        <li>debe: ${cliente.debe}</li>
                        <li>debemos: {cliente.debe < 0 ? cliente.debe * -1 : 0}</li>
                        <li>cantidad de compras: {fullCliente.cantidad_de_compras}</li>
                        <li>cantidad de facturas sin pagar: {fullCliente.cantidad_de_facturas_sin_pagar}</li>
                    </ul>
                </div>
            </div>

            <div className="box-interaccion-directa-cliente">
                <div>
                    <Link to={`/Clientes/pagos/${cliente.id}`} className='btn'>
                        Agregar Pago
                    </Link>
                </div>
                {/*<div>
                    <Link to={`/Ventas/0/CargaProductos/${cliente.id}`} className='btn'>
                        Comenzar Venta
                    </Link>
                </div>*/}
                <div>
                    <Link to={`/Clientes/acciones/${cliente.id}`} className='btn'>
                        Editar Datos del Cliente
                    </Link>
                </div>
            </div>

            <TablaDeVentas data={fullCliente.ventas} />

            <div className="centrado" style={{height: '20vh'}}>
                <Link to="/Clientes" className='btn btn-danger'>
                    Volver
                </Link>
            </div>

        </div>
    )
}