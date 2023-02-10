import './styles.css'
import { useEffect, useState } from 'react'
import GestorDeVentanas from './interfaces/GestorDeVentanas'
import CargaDeProductos from './interfaces/CargaDeProductos'
import SeleccionDeCliente from './interfaces/SeleccionDeCliente'
import TipoDeVenta from './interfaces/TipoDeVenta'
import { useLocation } from 'react-router-dom'

export default function Ventas(){
    const id = (useLocation().pathname.split('/'))
    const [ventana , setVentana] = useState<number>(0)

    return (
        <>
            <GestorDeVentanas
                ventana={ventana}
                setVentana={setVentana}                                        
            />

            {/* esto es temporal para usar la interaccion de las interfaces */}
            {undefined === id[2] && <SeleccionDeCliente />}
            {"CargaProductos" === id[2] && <CargaDeProductos />}
            {"TipoDeVenta" === id[2] && <TipoDeVenta />}
        </>
    )
}