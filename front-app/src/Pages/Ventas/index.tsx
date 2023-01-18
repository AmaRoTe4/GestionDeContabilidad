import './styles.css'
import { useState } from 'react'
import GestorDeVentanas from './interfaces/GestorDeVentanas'
import CargaDeProductos from './interfaces/CargaDeProductos'
import SeleccionDeCliente from './interfaces/SeleccionDeCliente'
import TipoDeVenta from './interfaces/TipoDeVenta'

export default function Ventas(){
    const [idCliente , setIdCliente] = useState<number>(0)
    //hacer que esta como mucho tenga 11 de largo
    const [ventana , setVentana] = useState<number>(0)

    return (
        <>
            <GestorDeVentanas
                ventana={ventana}
                setVentana={setVentana}                                        
            />

            {/* esto es temporal para usar la interaccion de las interfaces */}
            {idCliente === 0 && <SeleccionDeCliente setId={setIdCliente} id={ventana} />}
            {idCliente === 1 && <CargaDeProductos setId={setIdCliente} id={ventana} />}
            {idCliente === 2 && <TipoDeVenta setId={setIdCliente} id={ventana} />}
        </>
    )
}