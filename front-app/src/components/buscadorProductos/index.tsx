import { useEffect, useState } from "react";
import '../styles.css'
import { addProducts, removeProducts} from "../../store/elements/sales"
import { useDispatch, useSelector } from "react-redux";
import { Producto, ProductoDeVenta } from "../../../interface";
import { getAllProductos } from "../../api/productos";
import { filtroNombre, nombreProductoId } from "../../functions/productos/obtenerProductos";

interface Props{
    setActualization: React.Dispatch<React.SetStateAction<number>>
    allProductos:Producto[]
}

const proAux:Producto = {
    nombre: "",
    descripcion: "",
    categoria: 0,
    cantidad: 0,
    precio: 0,
    codigo: 0,
}

const BuscadorProductos = ({setActualization , allProductos}:Props) => {
    const dispatch = useDispatch()
    //@ts-ignore
    const [data , setData] = useState<string>("")
    const [cantidad , setCantidad] = useState<number>(0)
    const [productos , setProductos] = useState<Producto[]>([])
    const [productoAdd , setProductoAdd] = useState<Producto>(proAux)
    
    useEffect(() => {
        SetProductos()
    },[data])
    
    const SetProductos = () => {
        const aux:Producto[] = filtroNombre(data , 0 , allProductos)
        setProductos(aux)
    }
    
    const Agregar = () => {
        dispatch(addProducts(
        {
            id:productoAdd.id,
            precio:productoAdd.precio,
            cantidad:cantidad
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
                    {productos.map((n , i) => 
                        <li 
                            key={i} 
                            onClick={(e) => {e.preventDefault(); setProductoAdd(e => e.id === n.id 
                                ? proAux
                                : n) }}
                            className={n.nombre === productoAdd.nombre ? 'selectProducto' : ""}
                        >
                            <p>
                                {nombreProductoId(n.id !== undefined ? n.id : 0 , productos)}
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
                    placeholder='cantidad'
                    style={{textAlign: "end"}}
                    value={cantidad} 
                    type="number" 
                    id="precio" 
                    name="precio" 
                    onChange={e => setCantidad(e.target.value !== "" ? parseInt(e.target.value) : 0)} 
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