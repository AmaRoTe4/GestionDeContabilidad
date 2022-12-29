//import './styles.css'
import Basura from "../../../public/icons/basura.svg"
import Mas from "../../../public/icons/mas.svg"
import {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InterProductos } from '../../../interface'
import {mostrarTodosLosProductos } from '../../functions/https/Productos/index'
import { funcionesDeProcutos } from '../../functions/data/Productos'
import BuscadorProductos from '../../components/buscadorProductos'
import { Tabla } from '../../components/clientes/tabla'

export default function Productos(){
    const navigate = useNavigate()
    const [cliente, setCliente] = useState<string>("")
    const [clientes, setClientes] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])
    const [localidad, setLocalidad] = useState<string>("")
    const [localidades, setLocalidades] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])

    const clear = () => {
        setLocalidad("")
        setCliente("")
    }

    return (
        <>
            <div className="container d-flex flex-column" style={{maxHeight: '90vh'}}>
                <form className="formularioProductos">
                    <div>
                        <label>Clientes</label>
                        {/*<BuscadorProductos />*/}
                        <select
                            value={cliente}
                            name="select" 
                            onChange={(e) => {e.preventDefault(); setCliente(e.target.value)}}>
                                {clientes.map((n , i) => 
                                <option key={i} value={n}>
                                    {n}
                                </option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Localidades</label>
                        <select
                            value={localidad}
                            name="select" 
                            onChange={(e) => {e.preventDefault(); setLocalidad(e.target.value)}}>
                                {localidades.map((n , i) => 
                                <option key={i} value={n}>
                                    {n}
                                </option>
                            )}
                        </select>
                    </div>
                    <img className="basuraProductos" src={Basura} height="50px" onClick={e => {e.preventDefault(); clear()}}/>
                </form>
                {localidad === "" && cliente === "" &&
                <div className="formularioAgregar">
                    <div>
                        <p>Agregar Cliente</p>
                        <Link to="/Clientes/cliente/0">
                            <img src={Mas} height="30%" />
                        </Link>
                    </div>
                    <div style={{marginTop: '15px'}}>
                        <p>Agregar Localidad</p>
                        <Link to="/Clientes/localidad/0">
                            <img src={Mas} height="30%" />
                        </Link>
                    </div>
                </div>}
            </div>
            {!(localidad === "" && cliente === "") && 
                <Tabla 
                    data={cliente} 
                    categoria={localidad} 
                />
            }
        </>
    )
}
