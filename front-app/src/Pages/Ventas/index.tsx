import './styles.css'
import { useEffect, useState } from 'react'
import { InterProductos , } from "../../../interface"
import TablaVentas from '../../components/ventas/tabla';
import { mostrarTodosLosProductos , mostrarProductoNombre} from '../../functions/https/Productos/index'
import { AgreProducto } from '../../functions/data/Productos/index'
import { RealizarVenta } from '../../functions/data/ventas/index'
import { Bounce, toast } from 'react-toastify'

export default function Ventas(){
    const [cantidad , setCantidad] = useState<number>(1)
    const [total , setTotal] = useState<number[]>([0,0])
    const [prtsPorVender , setPrtsPorVender] = useState<InterProductos[]>([])
    const [elementos , setElementos] = useState<InterProductos[]>([])
    const [eleSelc , setEleSelc] = useState<InterProductos>({
        id:0,
        nombre:'',
        precio:0,
        vendidos:0
    })

    useEffect(() => {
        cargaDeElementos()
    },[])

    const cargaDeElementos = async () => {
        const aux = await mostrarTodosLosProductos()
        setElementos([eleSelc , ...aux])
    }

    const ObtenerEleSelc = async (nombre:string) => {
        if(nombre === undefined) return
        const aux = await mostrarProductoNombre(nombre)
        setEleSelc(aux)
    }
    
    const limpiar = () => {
        setTotal([0,0])
        setPrtsPorVender([])
    }

    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-desple-ventas centrado flex-column">
                <p>Productos</p>
                <select 
                    name="select" 
                    onChange={(e) => {e.preventDefault(); ObtenerEleSelc(e.target.value)}}>
                    {elementos.map((n , i) => 
                        (n.nombre !== "" || eleSelc.id === 0) && 
                        <option key={n.id} value={n.nombre}>
                            {n.nombre}
                        </option>
                    )}
                </select>
            </div>
            <div className="box-cantidad-ventas">
                <label htmlFor="precio">Cantidad</label>
                <input 
                    style={{textAlign: "end"}}
                    value={cantidad} 
                    type="number" 
                    id="precio" 
                    name="precio" 
                    onChange={e => setCantidad(e.target.value !== "" ? parseInt(e.target.value) : 0)} 
                />
            </div>
            <div className="box-agregar-ventas centrado">
                <button type="button" onClick={e => {e.preventDefault(); AgreProducto({
                    cantidad,
                    eleSelc,
                    prtsPorVender,
                    setPrtsPorVender,
                    setTotal,
                    setCantidad
                })}}>
                    Agregar
                </button>
            </div>
            <TablaVentas
                total={total}
                setTotal={setTotal}
                prtsPorVender={prtsPorVender}
                setPrtsPorVender={setPrtsPorVender}
            />
            <div className="box-bottones-ventas">
                <button 
                    className="btn btn-success" 
                    onClick={e => {
                        e.preventDefault(); 
                        RealizarVenta(prtsPorVender , limpiar) ; 
                        toast.success("Venta Realizada" , {
                            position: toast.POSITION.TOP_CENTER,
                            transition: Bounce
                        })
                }}>
                        Realizar Venta
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={e => {e.preventDefault(); limpiar()}}>
                        Cancelar
                </button>
            </div>
        </div>
    )
}