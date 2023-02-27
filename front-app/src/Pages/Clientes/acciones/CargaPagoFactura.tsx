import { Cliente, Venta } from "../../../../interface";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllVentas } from "../../../api/ventas";
import "./styles.css"
import { cartelOk } from "../../../functions/carteles/cartelesOkey";
import { AgregarPago } from "../../../functions/clientes/agregarPago";
import { useDispatch } from "react-redux";
import { fetchAllClientes } from "../../../store/elements/clientes";
import { getCliente } from "../../../api/clientes";

const defaultCliente:Cliente = {
    nombre:"",
    apellido:"",
    localidad:0,
    telefono:"",
    debe:0,
}

export default function CargarPagoFactura(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id:number = Number(useLocation().pathname.split('/')[3])
    const [pago , setPago] = useState<number>(0);
    const [venta , setVenta] = useState<Venta>();
    const [cliente , setCliente] = useState<Cliente>(defaultCliente);

    useEffect(() =>{
        obtenerVenta()
    },[])

    //@ts-ignore
    const obtenerVenta = async () => {
        const ventas:Venta[] | undefined = await getAllVentas()
        if(ventas === undefined) return undefined
        const auxVenta:Venta = ventas.filter(n => n.id === id)[0]
        if(auxVenta === undefined) return
        setVenta(auxVenta)

        let auxCliente:Cliente | undefined = await getCliente(auxVenta.cliente)
        if(auxCliente === undefined) return
        setCliente(auxCliente)
    }

    const CargarPago = async () => {
        if(venta === undefined) return
        let ventaAux:Venta = venta
        let ventaCliente:Cliente = cliente

        ventaAux.valor_abonado += pago
        ventaCliente.debe -= pago

        const resultado:boolean = await AgregarPago(ventaAux , id , ventaCliente)
    
        if(!resultado) return

        //@ts-ignore
        await dispatch(fetchAllClientes())
        
        cartelOk("Pago Realizado con Exito")

        navigate(`/Clientes/cliente/${cliente.id}`)
    }

    return (
        <div className="boxCargaPagoFactura" style={{height: '20vh'}}>
            <div>
                <p style={{paddingTop:10}}>Cliente: {cliente.nombre} {cliente.apellido}</p>
                <p>Fecha: {venta?.createdAt} </p>
                <p>Precio: ${venta?.valor_total}</p>
                <p>Valor Abonado: ${venta?.valor_abonado}</p>
                <p style={{paddingBottom:10}}>Total de Deuda: ${venta !== undefined ? venta?.valor_total - venta?.valor_abonado : ""}</p>
            </div>
            {venta !== undefined && 
            <form className="centrado">
                <input 
                    type="number" 
                    value={pago < 0 ? 0 : pago > venta.valor_total - venta.valor_abonado ? venta.valor_total - venta.valor_abonado : pago}
                    onChange={e => {
                        e.preventDefault() ; 
                        setPago(
                            Number(e.target.value) < 0 
                            ? 0 
                            : Number(e.target.value) > venta.valor_total - venta.valor_abonado
                            ? venta.valor_total - venta.valor_abonado
                            : Number(e.target.value)
                        )
                    }}
                />  
            </form>}
            <h6>{}</h6>
            <div className="centrado" style={{backgroundColor: "white" , border:"none"}}>
                <button
                    disabled={!(pago > 0)}
                    className="btn btn-success" 
                    onClick={e => {e.preventDefault() ; CargarPago()}}>
                    Aceptar
                </button>    
            </div>
            <Link to={cliente !== undefined ? `/Clientes/cliente/${cliente.id}` : "/Clientes"} className='btn btn-danger'>
                Volver
            </Link>
        </div>
    )
}

//if(!(await comprobandoConexion())) {
//    cartelError("Error De Conexion")
//    return
//}

//if(!(respuesta)) {
//    cartelError("Error a la Hora De Editar")
//    return
//}