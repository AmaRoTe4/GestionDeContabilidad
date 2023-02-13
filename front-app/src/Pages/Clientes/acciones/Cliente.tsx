import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import Basura from "../../../icons/basura.svg"
import './styles.css'
import { Localidad , Cliente} from "../../../../interface";
import { getAllLocalidades } from "../../../api/localidades";
import { createCliente, getCliente, updateCliente } from "../../../api/clientes";
import { fetchAllClientes } from "../../../store/elements/clientes";
import { useDispatch } from "react-redux";

export default function Acciones(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [apellido , setApellido] = useState<string>('')
    const [telefono , setTelefono] = useState<string>("")
    const [localidad , setLocalidad] = useState<string>('')
    const [localidades , setLocalidades] = useState<Localidad[]>([])

    useEffect(() => {
        allData()
    },[localidades])

    const allData = async () => {
        if(localidades.length === 0){
            let data:Localidad[] | undefined = await getAllLocalidades()
            if(data !== undefined) {
                setLocalidades(data)
            }
        }
        if(id !== 0 && localidades.length > 0) {
            const data:Cliente | undefined = await getCliente(id)
            if(data === undefined) return
            setNombre(data.nombre)
            setApellido(data.apellido)
            setTelefono(data.telefono)
            setLocalidad(localidades.filter(n => n.id === data.localidad)[0].nombre)
        }
    } 

    const crearCliente = async () => {
        //hacer notificacion
        const resultado = await createCliente({
            nombre:nombre,
            apellido:apellido,
            //@ts-ignore
            localidad: localidades.filter(n => n.nombre === localidad)[0].id ,
            telefono:telefono,
            debe:0,
        })
        //@ts-ignore
        await dispatch(fetchAllClientes())
        navigate("/Clientes")
    }

    const editarCliente = async () =>{
        //hacer notificacion
        const resultado = await updateCliente(id , {
            nombre:nombre,
            apellido:apellido,
            //@ts-ignore
            localidad: localidades.filter(n => n.nombre === localidad)[0].id ,
            telefono:telefono,
            debe:0,
        })
        //@ts-ignore
        await dispatch(fetchAllClientes())
        navigate("/Clientes/cliente/" + id)
    }

    const clear = () => {
        setNombre('')
        setApellido('')
        setLocalidad('')
        setTelefono("")
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
                            <option key={i} value={n.nombre}>
                                {n.nombre}
                            </option>
                        )}
                    </select>
                </div>
                <div className="centrado">
                    <label>Telefono</label>
                    <input 
                        value={telefono} 
                        type="string"  
                        onChange={e => {setTelefono(e.target.value)}} 
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
                    disabled={!(nombre !== "" && apellido !== "" && localidad !== "")}
                    className="btn btnProductos" 
                    style={{backgroundColor:"rgb(100 100 255)"}}
                    onClick={e => {
                        e.preventDefault(); 
                        {id === 0 ? crearCliente() : editarCliente()}
                    }}
                >
                    {/* aca tenemos que comprobar */}
                    {id === 0 ? 'Crear' : "Editar"}
                </button>
                <Link className="centrado" to={id === 0 ? `/Clientes` : `/Clientes/Cliente/${id}`}
                    style={{backgroundColor:"rgb(255 60 60)"}}
                >
                    <button className="btn">
                        Volver
                    </button>
                </Link>
                {/*{id !== 0 && 
                <Link style={{margin:0  , marginBottom:20 , backgroundColor:"rgb(255 60 60)"}} className="centrado" to='/Clientes'>
                    <button className="btn">
                        Eliminar
                    </button>
                </Link>}*/}
            </div>
        </div>
    )
}