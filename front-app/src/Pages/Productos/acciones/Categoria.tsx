import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import edit from "../../../icons/edit.svg";
import './styles.css'
import { Categoria } from "../../../../interface";
import { createCategoria, getAllLCategorias, getCategoria, updateCategoria } from "../../../api/categorias";
import { fetchAllCategorias } from "../../../store/elements/categorias";
import { useDispatch } from "react-redux";
import { cartelError } from "../../../functions/carteles/cartelError";
import { comprobandoConexion } from "../../../api/comprobador";

export default function AccionesProducto(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [vista , setVista] = useState<boolean>(false) 
    const [categorias , setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        if(id === 0) dataCategoria()
        if(id !== 0) dataNombre()
    },[vista , categorias])

    const dataCategoria = async () => {
        const aux:Categoria[] | undefined = await getAllLCategorias()
        if(aux === undefined) return 
        setCategorias(aux)
    }

    const dataNombre = async () => {
        const categoria:Categoria | undefined = await getCategoria(id)
        if(categoria === undefined ) return 
        setNombre(categoria.nombre)
    }

    const crearCategoria = async () => {
        if(!(await comprobandoConexion())) {
            cartelError("Error De Conexion")
            return
        }

        const respuesta:boolean = await createCategoria({
            nombre: nombre
        })

        if(!(respuesta)) {
            cartelError("Error a la Hora De Crear")
            return
        } 
        
        clear()
        //@ts-ignore
        await dispatch(fetchAllCategorias())
    }

    const editarCategoria = async () => {
        if(!(await comprobandoConexion())) {
            cartelError("Error De Conexion")
            return
        }

        const respuesta:boolean = await updateCategoria(id ,{
            nombre: nombre,
        })

        if(!(respuesta)) {
            cartelError("Error a la Hora De Editar")
            return
        } 
        
        
        navigate("/Productos")
        //@ts-ignore
        await dispatch(fetchAllCategorias())
    }

    const clear = () => {
        setNombre('')  
    }

    return (
        <div className="containt100 centrado flex-column">
            <div className="box-titulo-categoria centrado">
                <h1>{id === 0 ? 'Agregar Categoria' : "Editar Categoria"}</h1>
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
                <label style={{width: '50%' , textAlign:"start"}}>Categoria</label> 
                <select
                    style={{width: '50%'}}
                    name="select" 
                    onChange={(e) => {
                        e.preventDefault(); 
                        navigate(`/Productos/categoria/${categorias.filter(n => n.nombre === e.target.value)[0].id}`) 
                    }}>
                        {categorias.map((n , i) => 
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
                        e.preventDefault() ; 
                        id === 0 ? crearCategoria() : editarCategoria()
                    }}
                >
                    {id === 0 ? 'Crear' : "Editar"}
                </button>
                <Link className="centrado" to='/Productos'
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