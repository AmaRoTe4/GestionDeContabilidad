import '../styles.css'
import { useEffect, useState } from 'react'
import { Cliente } from "../../../../interface"
import TablaVentas from '../../../components/ventas/tabla';
import BuscadorProductos from '../../../components/buscadorProductos';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllProductos } from '../../../api/productos';
import { getCliente } from '../../../api/clientes';
import { clean, modIdCliente, modPath } from '../../../store/elements/sales';
import { useDispatch, useSelector } from 'react-redux';

const defaulCliente:Cliente = {
    nombre:"",
    apellido:"",
    localidad:0,
    telefono:"",
    debe:0,
}

export default function CargaDeProductos(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const id_ventana = parseInt(useLocation().pathname.split('/')[2])
    const id:number = parseInt(useLocation().pathname.split('/')[4])
    
    //@ts-ignore
    const cantidadDeArticulos:number = useSelector((state) => state.sales).filter(n => n.id === id_ventana)[0].productos.length
    
    const [actualization , setActualization] = useState<number>(0)
    const [cliente , setCliente] = useState<Cliente>(defaulCliente)

    useEffect(() => {
        dataCliente()
    }, [id_ventana])

    const dataCliente = async () => {
        const cliente:undefined | Cliente = await getCliente(id)
        if(cliente === undefined) return 
        setCliente(cliente)
    }

    const realizarVenta = () => {
        dispatch(modPath({
            id:id_ventana,
            newPath:`/Ventas/${id_ventana}/TipoDeVenta/${id}`
        }))
        navigate(`/Ventas/${id_ventana}/TipoDeVenta/${id}`)
    }

    const volver = () => {
        dispatch(modPath({
            id:id_ventana,
            newPath:`/Ventas/0`
        }))
        dispatch(modIdCliente({
            id:id_ventana,
            newId_cliente:-1
        }))
        dispatch(clean({id:id_ventana}))
        navigate(`/Ventas/0`)
    }

    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-nombre-cliente">
                <h4>{cliente.nombre}</h4>
            </div>
            <BuscadorProductos
                setActualization={setActualization}
            />
            <TablaVentas
                actualization={actualization}
                setActualization={setActualization}
            />
            <div className="box-bottones-ventas">
                <button 
                    disabled={cantidadDeArticulos === 0}
                    className="btn btn-success" 
                    onClick={e => {
                        e.preventDefault(); 
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