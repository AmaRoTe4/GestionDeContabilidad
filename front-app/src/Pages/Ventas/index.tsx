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

            {idCliente !== 0 && <SeleccionDeCliente id={ventana} />}
            {idCliente !== 0 && <CargaDeProductos id={ventana} />}
            {idCliente === 0 && <TipoDeVenta id={ventana} />}
        </>
    )
}