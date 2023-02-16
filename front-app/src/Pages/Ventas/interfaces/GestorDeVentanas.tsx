import '../styles.css'
import DeleteRed from '../../../icons/deleteRed.svg'
import Mas from '../../../icons/mas.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSales, removeSales } from '../../../store/elements/sales'
import { VentanaDeVenta } from '../../../../interface'

interface Props{
    ventana:number
    setVentana:React.Dispatch<React.SetStateAction<number>>
    sales:VentanaDeVenta[]
}

export default function GestorDeVentanas({ventana, setVentana , sales}:Props){
    const isSales:number[] = sales.map(n => n.id)
    const dispatch = useDispatch()

    const agregar = () => {
        if(isSales.length === 9) return 
        let id = isSales[isSales.length - 1]
        if(id === undefined) {
            dispatch(addSales(0))
            setVentana(0)
        }
        else dispatch(addSales(isSales[isSales.length - 1] + 1))
    }

    const borrar = (id:number) => {
        if(ventana === id && isSales.indexOf(id) > 1) setVentana(isSales[isSales.indexOf(id) - 1])
        else if(id === isSales[0]) setVentana(isSales[1])
        else if(ventana === id) setVentana(isSales[0]) 
        dispatch(removeSales(id))
    }

    return (
        <div className="box-ventanas">
            {isSales.length !== 0 && isSales.map((n , i) => 
                <span key={i}
                    style={{ 
                        border: `${ventana === n ? 'red' : ""} 1px solid`,
                        margin: `${ventana === n ? '4.8px 2px 5px 5px' : "0px 2px 5px 5px"} ` 
                    }}    
                >
                    <div
                        onClick={e => {e.preventDefault() ; setVentana(n)}}
                    >
                        <p>
                            {n !== -1 ? n : n}
                        </p>
                    </div>
                    <button 
                        onClick={e => {e.preventDefault() ; borrar(n)}}    
                    >
                        <img src={DeleteRed} />
                    </button>
                </span>
            )}
            <button 
                disabled={isSales.length === 9} 
                className="btnAgregarNuevaVenta" 
                onClick={e => {e.preventDefault() ; agregar()}}
            >
                <img src={Mas} />
            </button>
        </div>
    )
}