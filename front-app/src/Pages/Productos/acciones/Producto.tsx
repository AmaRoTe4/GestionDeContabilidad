import { useState } from "react";
import { useLocation} from "react-router-dom";
import { Link } from "react-router-dom";
import Basura from "../../../../public/icons/basura.svg"
import './styles.css'

export default function AccionesProducto(){
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [categoria , setCategoria] = useState<string>('')
    const [descripcion , setDescripcion] = useState<string>('')
    const [cantidad , setCantidad] = useState<number>(0)
    const [precio , setPrecio] = useState<number>(0)
    const [codigo , setCodigo] = useState<number>(0)
    const [categorias] = useState<string[]>([
        "",
        "primero",
        "segundo",
        "tercero",
    ])

    const clear = () => {
        setNombre('')
        setCategoria('')
        setDescripcion('')
        setCantidad(0)
        setPrecio(0)    
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
                    <label>Descripcion</label>
                    <input 
                        value={descripcion} 
                        type="text" 
                        onChange={e => {setDescripcion(e.target.value)}} 
                    />
                </div>
                <div className="centrado">
                    <label>Categoria</label>
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
                <div className="centrado">
                    <label>Cantidad</label>
                    <input 
                        value={cantidad} 
                        type="number"  
                        onChange={e => {setCantidad(Number(e.target.value))}} 
                    />
                </div>
                <div className="centrado">
                    <label>Precio</label>
                    <input 
                        value={precio} 
                        type="number"  
                        onChange={e => {setPrecio(Number(e.target.value))}} 
                    />
                </div>
                <div className="centrado">
                    <label>Codigo</label>
                    <input 
                        value={codigo} 
                        type="number"  
                        onChange={e => {setCodigo(Number(e.target.value))}} 
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
                <Link className="centrado" to='/Productos'
                    style={{backgroundColor:"rgb(255 60 60)"}}
                >
                    <button className="btn">
                        Volver
                    </button>
                </Link>
                {id !== 0 && 
                <Link style={{margin:0  , marginBottom:20 , backgroundColor:"rgb(255 60 60)"}} className="centrado" to='/Productos'>
                    <button className="btn">
                        Eliminar
                    </button>
                </Link>}
            </div>
        </div>
    )
}