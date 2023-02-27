import { Table } from "react-bootstrap";
import { Venta } from "../../../../interface";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataOfTheCustomer } from "../../../functions/clientes/obtenerDatosDeClientes";
import { TablaDeVentas } from "../../../components/clientes/tablaDeVentas";
import { getAllVentas } from "../../../api/ventas";
import { useSelector } from "react-redux";
import { estadoDeCompra } from "../../../functions/clientes/estadoDeCompras";
import { CargarPagoGeneal } from "../../../functions/clientes/AgregarPagaGeneral";
import { cartelOk } from "../../../functions/carteles/cartelesOkey";
import { fetchAllClientes } from "../../../store/elements/clientes";
import { useDispatch } from "react-redux";

export default function CargarPago(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id:string = useLocation().pathname.split('/')[3]
    const [ventas , setVentas] = useState<Venta[]>([])
    const [ventasPos , setVentasPos] = useState<Venta[]>([])
    const [valorVentasTotal , setValorVentasTotal] = useState<number>(0);
    const [pago , setPago] = useState<number>(0);

    //@ts-ignore
    const cliente:Cliente = useSelector((state) => state.clientes).filter(n => n.id === Number(id))[0]

    useEffect(() =>{
        obtenerData()
    },[])

    const obtenerData = async () => {
        const data:Venta[] | undefined = await getAllVentas()
        if(data === undefined) return 
        const aux = data.filter(n => n.valor_total > n.valor_abonado && Number(id) === n.cliente)
        setVentas(aux)
        
        let valorTotal:number = 0
        aux.map(n => valorTotal += (n.valor_total - n.valor_abonado)) 
    
        setValorVentasTotal(valorTotal)
    }

    const estado = (value:number) => {
        let aux:number = value < 0 ? 0 :value > valorVentasTotal ? valorVentasTotal : value
        setPago(aux)
        setVentasPos(estadoDeCompra(aux , ventas , setVentasPos))
    }

    const cargarPago = async () => {
        let estado:boolean = await CargarPagoGeneal(
            ventasPos,
            {
                id:cliente.id,
                nombre:cliente.nombre,
                apellido:cliente.apellido,
                localidad:cliente.localidad,
                telefono:cliente.telefono,
                debe:(cliente.debe - pago),
            }
        )

        if(!estado) return

        //@ts-ignore
        await dispatch(fetchAllClientes())

        cartelOk("Pago Efectuado con Exito")

        navigate(`/Clientes/cliente/${id}`)
    }

    return (
        <div className="centrado flex-column" style={{width: '100vw'}}>
            <h3 style={{width: "100%" , marginTop:20 , marginLeft:20}}>{cliente?.nombre}</h3>
            
            <h4 style={{marginTop: 50 }}>Estado Actual de Deuda</h4>
            <TablaDeVentas data={ventas} />

            <label style={{width: "40%" , marginTop:20}}>Pago: </label>
            <input 
                style={{width: "40%" , textAlign: "right"}}
                type="number" 
                value={pago < 0 ? 0 : pago > valorVentasTotal ? valorVentasTotal : pago}
                onChange={
                    e => {
                        e.preventDefault(); 
                        estado(Number(e.target.value))
                    }
                }
            />

            {ventasPos.length > 0 &&
            <>
                <h4 style={{marginTop: 50 }}>Nuevo Estado de Deuda</h4>
                <TablaDeVentas data={ventasPos} />
            </>}

            <div className="centrado" style={{height: '20vh' , marginTop:20}}>
                <button 
                    className='btn btn-success' 
                    style={{width: 200}} 
                    onClick={e => {e.preventDefault() ; cargarPago()}}
                >
                    Cargar Pago
                </button>
            </div>

            <div className="centrado" style={{height: '20vh'}}>
                <Link to={`/Clientes/cliente/${id}`} className='btn btn-danger'>
                    Volver
                </Link>
            </div>
        </div>
    )
}