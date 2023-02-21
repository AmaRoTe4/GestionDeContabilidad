import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Localidad } from "../../../../interface";
import edit from "../../../icons/edit.svg";
import { createLocalidad, getAllLocalidades, getLocalidad, updateLocalidad } from "../../../api/localidades";
import { fetchAllLocalidades } from "../../../store/elements/localidades";
import { useDispatch } from "react-redux";
import { comprobandoConexion } from "../../../api/comprobador";
import { cartelError } from "../../../functions/carteles/cartelError";

export default function LocalidadInterface(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [vista , setVista] = useState<boolean>(false) 
    const [localidades , setLocalidades] = useState<Localidad[]>([])

    useEffect(() => {
        if(localidades.length === 0) cargarLocalidades()
        if(id !== 0 && nombre === "") obtenerNombre()
    },[localidades , nombre , id])

    const obtenerNombre = async () =>{
        const data:Localidad | undefined = await getLocalidad(id)
        if(data !== undefined) setNombre(data.nombre)
    }

    const cargarLocalidades = async () =>{
        const data:Localidad[] | undefined = await getAllLocalidades()
        if(data !== undefined) setLocalidades(data)
    }

    const crearLocalidad = async () => {
        if(!(await comprobandoConexion())) {
            cartelError("Error De Conexion")
            return
        }

        const resultado = await createLocalidad({
            nombre:nombre
        })

        if(!(resultado)) {
            cartelError("Error a la Hora De Editar")
            return
        }

        setNombre("")
        //@ts-ignore
        await dispatch(fetchAllLocalidades())
        navigate("/Clientes")
    }

    const editarLocalidad = async () => {
        if(!(await comprobandoConexion())) {
            cartelError("Error De Conexion")
            return
        }

        const resultado = await updateLocalidad(id , {
            nombre:nombre
        })

        if(!(resultado)) {
            cartelError("Error a la Hora De Editar")
            return
        }

        setNombre("")
        //@ts-ignore
        await dispatch(fetchAllLocalidades())
        navigate("/Clientes")
    }

    return (
        <div className="containt100 centrado flex-column">
            <div className="box-titulo-categoria centrado">
                <h1>{id === 0 ? 'Agregar Localidad' : "Editar Localidad"}</h1>
            </div>
            <div className="box-formulario-categoria centrado flex-column">
                <div className="centrado">
                    <label htmlFor="Name">Nombre</label>
                    <input 
                        value={nombre} 
                        type="text" 
                        id="Name" 
                        name="Name" 
                        onChange={e => {setNombre(e.target.value)}} 
                    />
                </div>
            </div>
            {id === 0 && !vista && 
                <img 
                    src={edit} 
                    height="50px" 
                    className="editCategoria" 
                    onClick={e => {e.preventDefault(); setVista(!vista)}}
            />}
            {id === 0 && vista && 
            <div 
                className="centrado d-flex flex-column" 
                style={{width: '50vw'}}
            >
                <label style={{width: '50%' , textAlign:"start"}}>Localidad</label> 
                <select
                    style={{width: '50%'}}
                    name="select" 
                    onChange={(e) => {
                        e.preventDefault(); 
                        navigate(`/Clientes/localidad/${localidades.filter(n => n.nombre === e.target.value)[0].id}`) 
                    }}>
                        {localidades.map((n , i) => 
                        <option key={i} value={n.nombre}>
                            {n.nombre}
                        </option>
                    )}
                </select>
            </div>}
            <div className="box-buttom-categoria centrado flex-column">
                <button 
                    disabled={!(nombre !== "")}
                    className="btn btnProductos" 
                    style={{backgroundColor:"rgb(100 100 255)"}}
                    onClick={e => {
                        {e.preventDefault() ;
                        id === 0 
                        ? crearLocalidad() 
                        : editarLocalidad()}
                    }}
                >
                    {id === 0 ? 'Crear' : "Editar"}
                </button>
                <Link className="centrado" to='/Clientes'
                    style={{backgroundColor:"rgb(255 60 60)"}}
                >
                    <button className="btn">
                        Volver
                    </button>
                </Link>
            </div>
        </div>
    )
}