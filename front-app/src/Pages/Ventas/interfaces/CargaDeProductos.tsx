import '../styles.css'
import { useEffect, useState } from 'react'
import { Cliente, Producto , } from "../../../../interface"
import TablaVentas from '../../../components/ventas/tabla';
import { Bounce, toast } from 'react-toastify'
import BuscadorProductos from '../../../components/buscadorProductos';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllProductos } from '../../../api/productos';
import { getCliente } from '../../../api/clientes';
import { modPath } from '../../../store/elements/sales';
import { useDispatch } from 'react-redux';

export default function CargaDeProductos(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ventana = parseInt(useLocation().pathname.split('/')[2])
    const id:number = parseInt(useLocation().pathname.split('/')[4])
    const [actualization , setActualization] = useState<number>(0) 
    const [productos , setProductos] = useState<Producto[]>([])
    const [cliente , setCliente] = useState<Cliente>({
        nombre:"",
        apellido:"",
        localidad:0,
        telefono:"",
        debe:0,
    })

    useEffect(() => {
        if(productos.length === 0) ObtenerData()
        dataCliente()
    }, [ventana])

    const ObtenerData = async () => {
        const aux:undefined | Producto[] = await getAllProductos()
        if(aux === undefined) return 
        setProductos(aux)
    }

    const dataCliente = async () => {
        const cliente:undefined | Cliente = await getCliente(id)
        if(cliente === undefined) return 
        setCliente(cliente)
    }

    const realizarVenta = () => {
        dispatch(modPath({
            id:ventana,
            newPath:`/Ventas/${ventana}/TipoDeVenta/${id}`
        }))
        navigate(`/Ventas/${ventana}/TipoDeVenta/${id}`)
    }

    const volver = () => {
        dispatch(modPath({
            id:ventana,
            newPath:`/Ventas/${volver}/`
        }))
        navigate(`/Ventas/${volver}/`)
    }

    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-nombre-cliente">
                <h4>{cliente.nombre}</h4>
            </div>
            <BuscadorProductos 
                allProductos={productos}
                setActualization={setActualization}
            />
            <TablaVentas
                productos={productos}
                actualization={actualization}
                setActualization={setActualization}
            />
            <div className="box-bottones-ventas">
                <button 
                    className="btn btn-success" 
                    onClick={e => {
                        e.preventDefault(); 
                        toast.success("Venta Realizada" , {
                            position: toast.POSITION.TOP_CENTER,
                            transition: Bounce
                        });
                        realizarVenta();
                }}>
                        Realizar Venta
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={e => {e.preventDefault(); volver()}}>
                        Cancelar
                </button>
            </div>
        </div>
    )
}