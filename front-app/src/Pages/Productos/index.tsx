import './styles.css'
import Basura from "../../../public/icons/basura.svg"
import Mas from "../../../public/icons/mas.svg"
import {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InterProductos } from '../../../interface'
import {mostrarTodosLosProductos } from '../../functions/https/Productos/index'
import { funcionesDeProcutos } from '../../functions/data/Productos'
import BuscadorProductos from '../../components/buscadorProductos'
import { Tabla } from '../../components/productos/table'

export default function Productos(){
    const navigate = useNavigate()
    const [producto, setProducto] = useState<string>("")
    const [productos, setProductos] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])
    const [categoria, setCategoria] = useState<string>("")
    const [categorias, setCategorias] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])

    const clear = () => {
        setCategoria("")
        setProducto("")
    }

    return (
        <>
            <div className="container d-flex flex-column" style={{maxHeight: '90vh'}}>
                <form className="formularioProductos">
                    <div>
                        <label>Productos</label>
                        {/*<BuscadorProductos />*/}
                        <select
                            value={producto}
                            name="select" 
                            onChange={(e) => {e.preventDefault(); setProducto(e.target.value)}}>
                                {categorias.map((n , i) => 
                                <option key={i} value={n}>
                                    {n}
                                </option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Categorias</label>
                        <select
                            value={categoria}
                            name="select" 
                            onChange={(e) => {e.preventDefault(); setCategoria(e.target.value)}}>
                                {categorias.map((n , i) => 
                                <option key={i} value={n}>
                                    {n}
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
                    categoria={categoria} 
                />
            }
        </>
    )
}
