//import './styles.css'
import Basura from "../../icons/basura.svg"
import Mas from "../../icons/mas.svg"
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Localidad } from '../../../interface'
import { Tabla } from '../../components/clientes/tabla'
import { getAllLocalidades } from "../../api/localidades"

export default function Productos(){
    const [cliente, setCliente] = useState<string>("")
    const [localidad, setLocalidad] = useState<string>("")
    const [localidades, setLocalidades] = useState<Localidad[]>([])

    useEffect(() => {
        allData()
    },[])

    const allData = async () => {
        const data:Localidad[] | undefined = await getAllLocalidades()
        if(data !== undefined) setLocalidades(data)
    } 

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
                        <input 
                            type="text" 
                            value={cliente} 
                            onChange={(e) => {e.preventDefault() ; setCliente(e.target.value)}}
                        />
                    </div>
                    <div>
                        <label>Localidades</label>
                        <select
                            value={localidad}
                            name="select" 
                            onChange={(e) => {e.preventDefault(); setLocalidad(e.target.value)}}>
                                {localidades.map((n , i) => 
                                <option key={i} value={n.nombre}>
                                    {n.nombre}
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
                        <Link to="/Clientes/acciones/0">
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
                    //@ts-ignore
                    localidad={localidades.length !== 0 ? localidades.filter((n) => n.nombre === localidad)[0].id : 0} 
                />
            }
        </>
    )
}
