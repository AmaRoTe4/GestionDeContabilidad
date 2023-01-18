import { useState } from "react";
import "../styles.css"

interface Props{
    id:number
    setId: React.Dispatch<React.SetStateAction<number>>
}

export default function RealizarVenta({id , setId}:Props){
    const [seleccionado , setSeleccionado] = useState<string>("")
    const [cantidad , setCantidad] = useState<number>(0)

    return (
        <div className="boxTipoDeVenta">
            <h3>Finalizae venta</h3>
            <div className="centrado">
                <label>Selecciona el Tipo de venta</label>
                <select
                    name="select" 
                    onChange={(e) => {e.preventDefault(); setSeleccionado(e.target.value);}}> 
                    <option>
                        
                    </option>
                    <option value="completo">
                        venta pago completo  
                    </option>
                    <option value="parcial">
                        venta pago parcial
                    </option>
                    <option value="deber">
                        venta a deber   
                    </option>
                </select>
            </div>
            {seleccionado === 'parcial' && 
                <input
                    value={cantidad}
                    type="number" 
                    placeholder="monto del pago"
                    onChange={e => {e.preventDefault(); setCantidad(Number(e.target.value))}} 
                />
            }
            <div className="boxButtomTipoDeVenta">
                <button>
                    Volver
                </button>
                <button 
                    disabled={(
                        seleccionado === "" 
                        || (seleccionado === "parcial" && cantidad === 0 )) 
                    }
                    onClick={e => {e.preventDefault() ; setId(0)}}>
                    Finlizar Venta
                </button>
            </div>
        </div>
    )
}