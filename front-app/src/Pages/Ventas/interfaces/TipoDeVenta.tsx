import { useState } from "react";
import "../styles.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductoDeVenta, Venta } from "../../../../interface";
import { createVenta } from "../../../api/ventas";
import { useDispatch } from "react-redux";
import { clean } from "../../../store/elements/sales";

export default function RealizarVenta(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    //@ts-ignore
    const sales:ProductoDeVenta[] = useSelector((state) => state.sales)
    const [seleccionado , setSeleccionado] = useState<string>("")
    const [cantidad , setCantidad] = useState<number>(0)

    const realizarVenta = async () => {
        let valorTotal:number = 0
        
        sales.map(n => valorTotal += n.precio * n.cantidad)
        
        const venta:Venta = {
            cliente: id,
            articulos: sales,
            tipo_de_venta: 
            seleccionado === "completo" 
            ? 1 
            : seleccionado === "parcial"
            ? 2
            : seleccionado === "deber" 
            ? 3 
            : 0,
            valor_total: valorTotal,
            valor_abonado: 
            seleccionado === "completo" 
            ? valorTotal
            : seleccionado === "parcial"
            ? cantidad
            : 0
        } 
        
        await createVenta(venta)
        dispatch(clean())
        navigate("/Ventas")
    }
        
    return (
        <div className="boxTipoDeVenta">
            <h3>Finalizae venta</h3>
            <div className="centrado">
                <label>Selecciona el Tipo de venta</label>
                <select
                    style={{height: 40}}
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
                    onClick={e => {e.preventDefault() ; realizarVenta()}}>
                    Finlizar Venta
                </button>
            </div>
        </div>
    )
}