import { useEffect, useImperativeHandle, useRef, useState } from "react";
import '../styles.css'
import { addProducts } from "../../store/elements/sales"
import { useDispatch, useSelector } from "react-redux";
import { Producto } from "../../../interface";
import { filtroNombre, nombreProductoId } from "../../functions/productos/obtenerProductos";
import { useLocation } from "react-router-dom";
import { modCantidad } from "../../store/elements/productos";
import InputPrecio from "./inputsModificacionDePrecio";
import { obtenerPrecio } from "../../functions/ventas/precio";

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

    //descuento  y recargos
    const [descuento , setDescuento] = useState<number>(0)
    const [cantDes , setCantDes] = useState<number>(0)
    const [recargo , setRecargo] = useState<number>(0)
    const [cantRec , setCantRec] = useState<number>(0)
    
    useEffect(() => {
        const aux:Producto[] = filtroNombre(data , 0 , allProductos)
        setProductos(aux)

    },[data])

    const Agregar = () => {
        dispatch(modCantidad({id:productoAdd.id , cantidad:-cantidad}))
        dispatch(addProducts({
            id:ventana,
            productos:{
                id:productoAdd.id,
                cantidad:cantidad,
                precio: obtenerPrecio(
                    descuento,
                    cantDes,
                    recargo,
                    cantRec,
                    productoAdd.precio
                )
            }
        }))
        clear()
        setActualization(n => n + 1)
    }

    const clear = () => {
        setProductoAdd(proAux)
        setCantidad(0)
        setData("")
        setCantDes(0)
        setCantRec(0)
    }

    return (
        <>
            <div className="box-buscador-productos">
                <input 
                    placeholder="Productos" 
                    name={"data"}
                    id={'data'}
                    value={data}
                    onChange={e => {e.preventDefault() ;  setData(e.target.value)}}
                />
                <ul>
                    <li style={{backgroundColor: "rgb(100 100 100)" , color: "white"}}>
                        <p style={{width: "100%"}}>
                            Nombre
                        </p>
                        <p style={{justifyContent: "end"}}>
                            Codigo
                        </p>
                        <p style={{justifyContent: "end"}}>
                            Cantidad
                        </p>
                        <p style={{justifyContent: "end"}}>
                            Precio
                        </p>
                    </li>
                    {productoAdd !== undefined && productos.map((n , i) => 
                        <li 
                            key={i} 
                            onClick={(e) => {e.preventDefault(); 
                                {n.cantidad > 0 
                                ? setProductoAdd(
                                    e => e.codigo === n.codigo 
                                    ? proAux
                                    : n) 
                                : ""} }}
                            className={`${n.nombre === productoAdd.nombre ? 'selectProducto' : ""}
                                ${n.cantidad <= 0 ? "noValidos" : ""}`
                            }
                        >
                            <p style={{width: "100%"}}>
                                {nombreProductoId(n.id !== undefined ? n.id : 0 , productos)}
                            </p>
                            <p style={{justifyContent: "end"}}>
                                {n.codigo}
                            </p>
                            <p style={{justifyContent: "end"}}>
                                {n.cantidad}
                            </p>
                            <p style={{justifyContent: "end"}}>
                                ${n.precio}
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
                {productoAdd !== undefined && <input
                    placeholder='Cantidad'
                    style={{textAlign: "end"}}
                    value={cantidad > productoAdd.cantidad ? productoAdd.cantidad : cantidad <= 0 ? 0 : cantidad} 
                    type="number"
                    min={0} 
                    max={productoAdd.cantidad} 
                    id="cantidad" 
                    name="cantidad" 
                    onChange={e =>
                        {
                            //@ts-ignore 
                            e.nativeEvent.data !== undefined 
                            ? setCantidad(
                                Number(e.target.value) > productoAdd.cantidad 
                                ? productoAdd.cantidad 
                                : Number(e.target.value) <= 0 
                                ? 0
                                : Number(e.target.value))
                            : ""
                        ;}
                    }
                />}
            </div>

            <InputPrecio 
                cant={cantDes}
                setCant={setCantDes}
                mod={descuento}
                setMod={setDescuento}
                productoAdd={productoAdd}
                text={"Descuento"}
                max={true}
            />

            <InputPrecio 
                cant={cantRec}
                setCant={setCantRec}
                mod={recargo}
                setMod={setRecargo}
                productoAdd={productoAdd}
                text={"Recargo"}
                max={false}
            />

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