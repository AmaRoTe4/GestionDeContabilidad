import { useEffect, useState } from "react";
import { Bounce, toast } from 'react-toastify'
import "../styles.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cliente, ProductoDeVenta, Venta } from "../../../../interface";
import { useDispatch } from "react-redux";
import { clean } from "../../../store/elements/sales";
import { realizarVenta } from "../../../functions/ventas/realizarVenta";
import { modPath } from "../../../store/elements/sales";

export default function RealizarVenta(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ventana = parseInt(useLocation().pathname.split('/')[2])
    const id:number = parseInt(useLocation().pathname.split('/')[4])
    //@ts-ignore
    const sales:VentanaDeVenta[] = useSelector((state) => state.sales)
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    const [cliente , setCliente] = useState<Cliente>()

    const [seleccionado , setSeleccionado] = useState<string>("")
    const [cantidad , setCantidad] = useState<number>(0)
    const [valorTotalVenta , setValorTotalVenta] = useState<number>(0)

    useEffect(() => {
        data()
    }, [ventana])
    
    const data = () => {
        let valorTotal:number = 0
        const salesUnit:ProductoDeVenta[] = sales.filter(n => n.id === ventana)[0].productos
        salesUnit.map(n => valorTotal += n.precio * n.cantidad)
        setValorTotalVenta(valorTotal)
        setCliente(clientes.filter(n => n.id === id)[0])
    }

    const Venta = async () => {
        await realizarVenta(id, seleccionado, valorTotalVenta, cantidad , sales[ventana].productos)
        dispatch(clean({id:ventana}))
        navigate(`/Ventas/${ventana}`)
    }
        
    const volver = () => {
        dispatch(modPath({
            id:ventana,
            newPath:`/Ventas/${ventana}/CargaProductos/${id}/`
        }))
        navigate(`/Ventas/${ventana}/CargaProductos/${id}/`)
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
            <div className="boxResumenDeVenta">
                <ul>
                    <p>Resumen</p>
                    <div>
                        <li>
                            <p>
                                Nombre: 
                            </p>
                            <p>
                                {cliente !== undefined && cliente.nombre}
                            </p>
                        </li>
                        <li>
                            <p>
                                Apellido: 
                            </p>
                            <p>
                                {cliente !== undefined && cliente.apellido}
                            </p>
                        </li>
                        <li>
                            <p>
                                Valor Total de Venta: 
                            </p>
                            <p>
                                ${valorTotalVenta}
                            </p>
                        </li>
                    </div>
                </ul>
            </div>
            <div className="boxButtomTipoDeVenta">
                <button onClick={e => {e.preventDefault() ; volver()}}>
                    Volver
                </button>
                <button 
                    disabled={(
                        seleccionado === "" 
                        || (seleccionado === "parcial" && cantidad === 0 )) 
                    }
                    onClick={e => {
                        e.preventDefault() ; 
                        toast.success("Venta Realizada" , {
                            position: toast.POSITION.TOP_CENTER,
                            transition: Bounce
                        });
                        Venta()}}>
                    Finlizar Venta
                </button>
            </div>
        </div>
    )
}
