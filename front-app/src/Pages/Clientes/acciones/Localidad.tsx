import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import edit from "../../../../public/icons/edit.svg";
//import './styles.css'

export default function Localidad(){
    const navigate = useNavigate();
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [vista , setVista] = useState<boolean>(false) 
    const [categorias] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])

    return (
        <div className="containt100 centrado flex-column">
            <div className="box-titulo-categoria centrado">
                <h1>{id === 0 ? 'Agregar' : "Editar"}</h1>
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
                    onChange={(e) => {e.preventDefault(); navigate(`/Clientes/localidad/${e.target.value}`) }}>
                        {categorias.map((n , i) => 
                        <option key={i} value={n}>
                            {n}
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
                        id === 0 
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