import './styles.css'
import { useEffect, useState } from 'react'
import GestorDeVentanas from './interfaces/GestorDeVentanas'
import CargaDeProductos from './interfaces/CargaDeProductos'
import SeleccionDeCliente from './interfaces/SeleccionDeCliente'
import TipoDeVenta from './interfaces/TipoDeVenta'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Cliente, VentanaDeVenta } from '../../../interface'
import { fetchAllClientes } from '../../store/elements/clientes'
import { fetchAllProductos } from '../../store/elements/productos'

export default function Ventas(){
    const navigate = useNavigate()
    const id_ventana:number = parseInt(useLocation().pathname.split('/')[2])
    const id_estado:string = useLocation().pathname.split('/')[3]
    const [ventana , setVentana] = useState<number>(-1)
    //@ts-ignore
    const sales:VentanaDeVenta[] = useSelector((state) => state.sales)
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    //@ts-ignore
    const productos:Producto[] = useSelector((state) => state.productos)
    const dispatch = useDispatch()
    const [intentos , setIntentos] = useState<number>(0)


    useEffect(() => {
        let aux:VentanaDeVenta = sales.filter(n => n.id === ventana)[0]
        if(aux === undefined) return
        navigate(aux.path)
        if(intentos < 1) dataRedux()
    },[ventana , productos , clientes])
    
    const dataRedux = async () => {
        setIntentos(intentos + 1)
        //@ts-ignore
        await dispatch(fetchAllProductos())
        //@ts-ignore
        await dispatch(fetchAllClientes())
    }

    return (
        <>
            <GestorDeVentanas
                ventana={ventana}
                setVentana={setVentana}
                sales={sales}                                        
            />

            {ventana !== -1 && undefined === id_estado && <SeleccionDeCliente />}
            {ventana !== -1 && "CargaProductos" === id_estado && <CargaDeProductos />}
            {ventana !== -1 && "TipoDeVenta" === id_estado && <TipoDeVenta />}
        </>
    )
}