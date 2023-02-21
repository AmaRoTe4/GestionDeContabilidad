import { useEffect, useState } from "react";
import { useLocation  , useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import Basura from "../../../icons/basura.svg"
import './styles.css'
import { getAllLCategorias } from "../../../api/categorias";
import { Categoria, Producto } from "../../../../interface";
import { createProducto, getProducto, updateProducto } from "../../../api/productos";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductos } from "../../../store/elements/productos";
import { comprobandoConexion } from "../../../api/comprobador";
import { Bounce, toast } from "react-toastify";
import { cartelError } from "../../../functions/carteles/cartelError";

export default function AccionesProducto(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id:number = parseInt(useLocation().pathname.split('/')[3])
    const [nombre , setNombre] = useState<string>('')
    const [descripcion , setDescripcion] = useState<string>('')
    const [cantidad , setCantidad] = useState<number>(0)
    const [precio , setPrecio] = useState<number>(0)
    const [codigo , setCodigo] = useState<number>(0)
    const [categoria , setCategoria] = useState<string>('')
    //@ts-ignore
    const categorias:Categoria[] = useSelector((state) => state.categorias)
    //@ts-ignore
    const producto:Producto[] = useSelector((state) => state.productos)

    useEffect(() => {
        allData()
    },[])

    const allData = async () => {
        if(id === 0) return 
        const producto:Producto | undefined = await getProducto(id)
        if(producto === undefined ) return 
        setNombre(producto.nombre)
        setCategoria(categorias.filter(n => producto.categoria === n.id)[0].nombre)
        setDescripcion(producto.descripcion)
        setCantidad(producto.cantidad)
        setPrecio(producto.precio)    
        setCodigo(producto.codigo)  
    }

    const crearProducto = async () => {
        
        if(!(await comprobandoConexion())) {
            cartelError("Error De Conexion")
            return
        }

        const respuesta:boolean = await createProducto({
            nombre: nombre,
            descripcion: descripcion,
            cantidad: cantidad,
            precio: precio,
            codigo: codigo,
            //@ts-ignore
            categoria: categorias.filter(n => n.nombre === categoria)[0].id ,
        })
        
        if(!(respuesta)) {
            cartelError("Error a la Hora De Crear")
            return
        } 
        
        clear()
        //@ts-ignore
        await dispatch(fetchAllProductos())
    }

    const editarProducto = async () => {
        if(!(await comprobandoConexion())) {
            cartelError("Error De Conexion")
            return
        }

        const respuesta:boolean = await updateProducto(id ,{
            nombre: nombre,
            descripcion: descripcion,
            cantidad: cantidad,
            precio: precio,
            codigo: codigo,
            //@ts-ignore
            categoria: categorias.filter(n => n.nombre === categoria)[0].id ,
        })

        if(!(respuesta)) {
            cartelError("Error a la Hora De Editar")
            return
        } 

        //@ts-ignore
        await dispatch(fetchAllProductos())
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

    const codigoAuto = ():number => {
        let aux:(number | undefined)[] = producto.map(n => n.codigo)
        let minNum:number = aux[0] !== undefined ? aux[0] : 0

        for(let i = 0; i < aux.length; i++) {
            if(aux[i] === undefined) return -1
            //@ts-ignore
            if(aux[i] < minNum) minNum = aux[i]
        }

        let addNumero = 1

        while(true){
            if(!aux.includes(minNum + addNumero)) return minNum + addNumero
            else addNumero++
        }
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
                        onChange={e => {
                            //@ts-ignore
                            e.nativeEvent.data !== undefined 
                            ? setCantidad(Number(e.target.value))
                            : ""
                        }} 
                    />
                </div>
                <div className="centrado">
                    <label>Precio</label>
                    <input 
                        style={{textAlign: "end"}}
                        value={precio} 
                        type="number"  
                        onChange={e => {
                            //@ts-ignore
                            e.nativeEvent.data !== undefined 
                            ? setPrecio(Number(e.target.value))
                            : ""
                        }} 
                    />
                </div>
                <div className="centrado">
                    <label>Codigo</label>
                    <input
                        style={{textAlign: "end"}}
                        value={codigo} 
                        type="number"  
                        onChange={e => {
                            //@ts-ignore
                            e.nativeEvent.data !== undefined 
                            ? setCodigo(Number(e.target.value))
                            : ""
                        }} 
                    />
                </div>
                {id === 0  && 
                <button 
                    className="btn btn-dark mt-3" 
                    onClick={e => {e.preventDefault() ; setCodigo(codigoAuto())
                }}>
                    Generar Codigo Automatico
                </button>}
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
            </div>
        </div>
    )
}