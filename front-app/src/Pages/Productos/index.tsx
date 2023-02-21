import './styles.css'
import Basura from "../../icons/basura.svg"
import Mas from "../../icons/mas.svg"
import {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Categoria, Producto } from '../../../interface'
import { Tabla } from '../../components/productos/table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductos } from '../../store/elements/productos'
import { fetchAllCategorias } from '../../store/elements/categorias'

export default function Productos(){
    const [producto, setProducto] = useState<string>("")
    const [categoria, setCategoria] = useState<string>("")
    //@ts-ignore
    const categorias:Categoria[] = useSelector((state) => state.categorias)
    //@ts-ignore
    const productos:Producto[] = useSelector((state) => state.productos)
    const dispatch = useDispatch()
    const [intentos , setIntentos] = useState<number>(0)

    useEffect(() => {
        if(intentos < 1) dataRedux()
    },[productos , categorias])
    
    const dataRedux = async () => {
        setIntentos(intentos + 1)
        //@ts-ignore
        await dispatch(fetchAllProductos())
        //@ts-ignore
        await dispatch(fetchAllCategorias())
    }

    const clear = () => {
        setProducto("")
        setCategoria('')
    }

    return (
        <>
            <div className="container d-flex flex-column" style={{maxHeight: '90vh'}}>
                <form className="formularioProductos">
                    <div>
                        <label>Productos</label>
                        <input
                            type="text"
                            value={producto}
                            onChange={(e) => {setProducto(e.target.value)}}
                        />
                    </div>
                    <div>
                        <label>Categorias</label>
                        <select
                            value={categoria}
                            name="select" 
                            onChange={(e) => {e.preventDefault(); setCategoria(e.target.value)}}>
                                {categorias.map((n , i) => 
                                <option key={i} value={n.nombre}>
                                    {n.nombre}
                                </option>
                            )}
                        </select>
                    </div>
                    <img className="basuraProductos" src={Basura} height="50px" onClick={e => {e.preventDefault(); clear()}}/>
                </form>
                {categoria === "" && producto === "" &&
                <div className="formularioAgregar">
                    <div>
                        <p>Agregar Productos</p>
                        <Link to="/Productos/producto/0">
                            <img src={Mas} height="30%" />
                        </Link>
                    </div>
                    <div style={{marginTop: '15px'}}>
                        <p>Agregar Categoria</p>
                        <Link to="/Productos/categoria/0">
                            <img src={Mas} height="30%" />
                        </Link>
                    </div>
                </div>}
            </div>
            {!(categoria === "" && producto === "") && 
                <Tabla 
                    data={producto} 
                    //@ts-ignore
                    categoria={categoria.length !== 0 ? categorias.filter((n) => n.nombre === categoria)[0].id : 0}
                />
            }
        </>
    )
}
