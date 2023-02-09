import { useEffect, useState } from "react";
import { useLocation  , useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import Basura from "../../../icons/basura.svg"
import './styles.css'
import { getAllLCategorias } from "../../../api/categorias";
import { Categoria, Producto } from "../../../../interface";
import { createProducto, getProducto, updateProducto } from "../../../api/productos";

export default function AccionesProducto(){
    const navigate = useNavigate()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [descripcion , setDescripcion] = useState<string>('')
    const [cantidad , setCantidad] = useState<number>(0)
    const [precio , setPrecio] = useState<number>(0)
    const [codigo , setCodigo] = useState<number>(0)
    const [categoria , setCategoria] = useState<string>('')
    const [categorias , setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        allData()
    },[])

    const allData = async () => {
        const aux:Categoria[] | undefined = await getAllLCategorias()
        if(aux === undefined) return 
        setCategorias(aux)
        if(id === 0) return 
        const producto:Producto | undefined = await getProducto(id)
        if(producto === undefined ) return 
        setNombre(producto.nombre)
        setCategoria(aux.filter(n => producto.categoria === n.id)[0].nombre)
        setDescripcion(producto.descripcion)
        setCantidad(producto.cantidad)
        setPrecio(producto.precio)    
        setCodigo(producto.codigo)  
    }

    const crearProducto = () => {
        const respuesta:boolean = createProducto({
            nombre: nombre,
            descripcion: descripcion,
            cantidad: cantidad,
            precio: precio,
            codigo: codigo,
            //@ts-ignore
            categoria: categorias.filter(n => n.nombre === categoria)[0].id ,
        })
        
        clear()
    }

    const editarProducto = () => {
        const respuesta:boolean = updateProducto(id ,{
            nombre: nombre,
            descripcion: descripcion,
            cantidad: cantidad,
            precio: precio,
            codigo: codigo,
            //@ts-ignore
            categoria: categorias.filter(n => n.nombre === categoria)[0].id ,
        })
        
        navigate("/Productos")
    }

    const clear = () => {
        setNombre('')
        setCategoria('')
        setDescripcion('')
        setCantidad(0)
        setPrecio(0)    
        setCodigo(0)    
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
                            <option key={i} value={n.nombre}>
                                {n.nombre}
                            </option>
                        )}
                    </select>
                </div>
                <div className="centrado">
                    <label>Cantidad</label>
                    <input 
                        style={{textAlign: "end"}}
                        value={cantidad} 
                        type="number"  
                        onChange={e => {setCantidad(Number(e.target.value))}} 
                    />
                </div>
                <div className="centrado">
                    <label>Precio</label>
                    <input 
                        style={{textAlign: "end"}}
                        value={precio} 
                        type="number"  
                        onChange={e => {setPrecio(Number(e.target.value))}} 
                    />
                </div>
                <div className="centrado">
                    <label>Codigo</label>
                    <input
                        style={{textAlign: "end"}}
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
                    disabled={!(nombre !== "" && categoria !== "" && cantidad !== 0 && precio !== 0 && codigo !== 0)}
                    className="btn btnProductos" 
                    style={{backgroundColor:"rgb(100 100 255)"}}
                    onClick={e => {
                        e.preventDefault() ; id === 0 ? crearProducto() : editarProducto()
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
                {/*{id !== 0 && 
                <Link style={{margin:0  , marginBottom:20 , backgroundColor:"rgb(255 60 60)"}} className="centrado" to='/Productos'>
                    <button className="btn">
                        Eliminar
                    </button>
                </Link>}*/}
            </div>
        </div>
    )
}