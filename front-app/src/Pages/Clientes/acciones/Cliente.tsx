import { useState } from "react";
import { useLocation} from "react-router-dom";
import { Link } from "react-router-dom";
import Basura from "../../../../public/icons/basura.svg"
//import './styles.css'

export default function Cliente(){
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [apellido , setApellido] = useState<string>('')
    const [localidad , setLocalidad] = useState<string>('')
    const [telefono , setTelefono] = useState<number>(0)
    const [localidades] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])

    const clear = () => {
        setNombre('')
        setApellido('')
        setLocalidad('')
        setTelefono(0)
    }

    return (
        <div className="containt100 centrado flex-column">
            <div className="box-titulo-productos centrado">
                <h1>{id === 0 ? 'Agregar' : "Editar"}</h1>
            </div>
            <div className="box-formulario-productos centrado flex-column">
                <div className="centrado">
                    <label>Nombre</label>
                    <input 
                        value={nombre} 
                        type="text" 
                        onChange={e => {setNombre(e.target.value)}} 
                    />
                </div>
                <div className="centrado">
                    <label>Apellido</label>
                    <input 
                        value={apellido} 
                        type="text" 
                        onChange={e => {setApellido(e.target.value)}} 
                    />
                </div>
                <div className="centrado">
                    <label>Localidad</label>
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
                <div className="centrado">
                    <label>Telefono</label>
                    <input 
                        value={telefono} 
                        type="number"  
                        onChange={e => {setTelefono(Number(e.target.value))}} 
                    />
                </div>
            </div>
            <img 
                className="basuraProductos" 
                src={Basura} 
                style={{marginBottom:'50px'}} 
                height="50px" 
                onClick={e => {e.preventDefault(); clear()}}
            />
            <div className="box-buttom-productos centrado flex-column">
                <button 
                    disabled={!(nombre !== "")}
                    className="btn btnProductos" 
                    style={{backgroundColor:"rgb(100 100 255)"}}
                    onClick={e => {
                        e.preventDefault() ;
                    }}
                >
                    {id === 0 ? 'Crear' : "Editar"}
                </button>
                <Link className="centrado" to={id === 0 ? `/Clientes` : `/Clientes/Cliente/${id}`}
                    style={{backgroundColor:"rgb(255 60 60)"}}
                >
                    <button className="btn">
                        Volver
                    </button>
                </Link>
                {id !== 0 && 
                <Link style={{margin:0  , marginBottom:20 , backgroundColor:"rgb(255 60 60)"}} className="centrado" to='/Clientes'>
                    <button className="btn">
                        Eliminar
                    </button>
                </Link>}
            </div>
        </div>
    )
}