import { useEffect, useState } from "react";
import '../styles.css'
import { addProducts, removeProducts} from "../../store/elements/sales"
import { useDispatch, useSelector } from "react-redux";
import { Producto, ProductoDeVenta } from "../../../interface";
import { getAllProductos } from "../../api/productos";
import { filtroNombre, nombreProductoId } from "../../functions/productos/obtenerProductos";
import { useLocation } from "react-router-dom";
import { modCantidad } from "../../store/elements/productos";

interface Props{
    setActualization: React.Dispatch<React.SetStateAction<number>>
}

const proAux:Producto = {
    nombre: "",
    descripcion: "",
    categoria: 0,
    cantidad: 0,
    precio: 0,
    codigo: 0,
}

const BuscadorProductos = ({
    setActualization,
}:Props) => {    
    const dispatch = useDispatch()
    const [productos , setProductos] = useState<Producto[]>([]) 
    //@ts-ignore
    const allProductos:Producto[] = useSelector((state) => state.productos)
    const ventana:number = parseInt(useLocation().pathname.split('/')[2])
    //@ts-ignore
    const [data , setData] = useState<string>("")
    const [cantidad , setCantidad] = useState<number>(0)
    const [productoAdd , setProductoAdd] = useState<Producto>(proAux)
    
    useEffect(() => {
        SetProductos()
    },[data , ventana , allProductos])
    
    const SetProductos = () => {
        const aux:Producto[] = filtroNombre(data , 0 , allProductos)
        setProductos(aux)
    }
    
    const Agregar = () => {
        dispatch(modCantidad({id:productoAdd.id , cantidad:-cantidad}))
        dispatch(addProducts({
            id:ventana,
            productos:{
                id:productoAdd.id,
                precio:productoAdd.precio,
                cantidad:cantidad
            }
        }))
        clear()
        setActualization(n => n + 1)
    }

    const clear = () => {
        setProductoAdd(proAux)
        setCantidad(0)
        setData("")
    }

    return (
        <>
            <div className="box-buscador-productos">
                <input 
                    placeholder="Productos" 
                    value={data}
                    onChange={e => {e.preventDefault() ; setData(e.target.value)}}
                />
                <ul>
                    <li style={{backgroundColor: "rgb(100 100 100)" , color: "white"}}>
                        <p>
                            Nombre
                        </p>
                        <p style={{justifyContent: "end"}}>
                            Codigo
                        </p>
                        <p style={{justifyContent: "end"}}>
                            Cantidad
                        </p>
                    </li>
                    {productos.map((n , i) => 
                        <li 
                            key={i} 
                            onClick={(e) => {e.preventDefault(); 
                                {n.cantidad > 0 
                                ? setProductoAdd(
                                    e => e.id === n.id 
                                    ? proAux
                                    : n) 
                                : ""} }}
                            className={`${n.nombre === productoAdd.nombre ? 'selectProducto' : ""}
                                ${n.cantidad <= 0 ? "noValidos" : ""}`
                            }
                        >
                            <p>
                                {nombreProductoId(n.id !== undefined ? n.id : 0 , productos)}
                            </p>
                            <p style={{justifyContent: "end"}}>
                                {n.codigo}
                            </p>
                            <p style={{justifyContent: "end"}}>
                                {n.cantidad}
                            </p>
                        </li>
                    )}
                </ul>
            </div>
            <div className="box-cantidad-ventas">
                <label
                    style={{textAlign: "start" , width: "80%"}}
                >
                    Cantidad
                </label>
                <input
                    placeholder='Cantidad'
                    style={{textAlign: "end"}}
                    value={cantidad > productoAdd.cantidad ? productoAdd.cantidad : cantidad === 0 ? "" : cantidad} 
                    type="number"
                    min={0} 
                    max={productoAdd.cantidad} 
                    id="precio" 
                    name="precio" 
                    onChange={e => setCantidad(
                        e.target.value !== "" 
                        ? parseInt(e.target.value) > productoAdd.cantidad 
                            ? productoAdd.cantidad 
                            : parseInt(e.target.value)
                        : 0)} 
                />
            </div>
            <div className="box-agregar-ventas centrado">
                <button 
                    disabled={!(cantidad > 0 && productoAdd.id !== 0)}
                    type="button" 
                    onClick={e => {e.preventDefault(); Agregar()}}>
                    Agregar
                </button>
            </div>
        </>
    )
}

export default BuscadorProductos