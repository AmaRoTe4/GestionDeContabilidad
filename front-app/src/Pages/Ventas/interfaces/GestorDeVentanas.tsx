import '../styles.css'
import DeleteRed from '../../../../public/icons/deleteRed.svg'
import Mas from '../../../../public/icons/mas.svg'
import { useState } from 'react'

interface Props{
    ventana:number
    setVentana:React.Dispatch<React.SetStateAction<number>>
}

export default function GestorDeVentanas({ventana, setVentana}:Props){
    const [ventanas , setVentanas] = useState<number[]>([0])

    const agregar = () => {
        if(ventanas.length === 9) return 
        let id = ventanas[ventanas.length - 1]
        if(id === undefined) {
            setVentanas([0])
            setVentana(0)
        }
        else setVentanas(n => [...n , id + 1])
    }

    const borrar = (id:number) => {
        let newVentanas = ventanas
        if(ventana === id && ventanas.indexOf(id) > 1) setVentana(ventanas[ventanas.indexOf(id) - 1])
        else if(ventana === ventanas[0]) setVentana(ventanas[1])
        else if(ventana === id) setVentana(ventanas[0])
        setVentanas(newVentanas.filter((n , i) => n !== id))
    }

    return (
        <div className="box-ventanas">
            {ventanas.length !== 0 && ventanas.map((n , i) => 
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
                            {n}
                        </p>
                    </div>
                    <button 
                        onClick={e => {e.preventDefault() ; borrar(n)}}    
                    >
                        <img src={DeleteRed} />
                    </button>
                </span>
            )}
            <button disabled={ventanas.length === 9} className="btnAgregarNuevaVenta" onClick={e => {e.preventDefault() ; agregar()}}>
                <img src={Mas} />
            </button>
        </div>
    )
}