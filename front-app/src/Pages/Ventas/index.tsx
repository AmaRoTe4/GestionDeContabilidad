import './styles.css'
import { useEffect, useState } from 'react'
import GestorDeVentanas from './interfaces/GestorDeVentanas'
import CargaDeProductos from './interfaces/CargaDeProductos'
import SeleccionDeCliente from './interfaces/SeleccionDeCliente'
import TipoDeVenta from './interfaces/TipoDeVenta'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { VentanaDeVenta } from '../../../interface'

export default function Ventas(){
    const navigate = useNavigate()
    const id_ventana:number = parseInt(useLocation().pathname.split('/')[2])
    const id_estado:string = useLocation().pathname.split('/')[3]
    const [ventana , setVentana] = useState<number>(0)
    //@ts-ignore
    const sales:VentanaDeVenta[] = useSelector((state) => state.sales)

    useEffect(() => {
        let aux:VentanaDeVenta = sales.filter(n => n.id === ventana)[0]
        navigate(aux.path)
    },[ventana])

    return (
        <>
            <GestorDeVentanas
                ventana={ventana}
                setVentana={setVentana}
                sales={sales}                                        
            />

            {undefined === id_estado && <SeleccionDeCliente />}
            {"CargaProductos" === id_estado && <CargaDeProductos />}
            {"TipoDeVenta" === id_estado && <TipoDeVenta />}
        </>
    )
}