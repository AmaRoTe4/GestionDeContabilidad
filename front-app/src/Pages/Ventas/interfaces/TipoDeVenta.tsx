import { useEffect, useState } from "react";
import "../styles.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Cliente, Producto, ProductoDeVenta, Venta } from "../../../../interface";
import { useDispatch } from "react-redux";
import { clean } from "../../../store/elements/sales";
import { realizarVenta } from "../../../functions/ventas/realizarVenta";
import { modPath } from "../../../store/elements/sales";
import { cartelError } from "../../../functions/carteles/cartelError";
import { comprobandoConexion } from "../../../api/comprobador";
import { cartelOk } from "../../../functions/carteles/cartelesOkey";
import Ver from "../../../icons/VerOjo.svg"
import Dowload from "../../../icons/Download.svg"
import { PDFDownloadLink } from "@react-pdf/renderer";
import Document from "./pdf/document"

export default function RealizarVenta(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id_ventana = parseInt(useLocation().pathname.split('/')[2])
    const id:number = parseInt(useLocation().pathname.split('/')[4])
    //@ts-ignore
    const productos:Producto[] = useSelector((state) => state.productos)
    //@ts-ignore
    const sales:VentanaDeVenta[] = useSelector((state) => state.sales)
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    const [cliente , setCliente] = useState<Cliente>()

    const [seleccionado , setSeleccionado] = useState<string>("")
    const [cantidad , setCantidad] = useState<number>(0)
    const [compra , setCompra] = useState<ProductoDeVenta[]>([])
    const [valorTotalVenta , setValorTotalVenta] = useState<number>(0)

    useEffect(() => {
        data()
    }, [id_ventana])
    
    const data = () => {
        let valorTotal:number = 0
        const salesUnit:ProductoDeVenta[] = sales.filter(n => n.id === id_ventana)[0].productos
        setCompra(salesUnit)
        salesUnit.map(n => valorTotal += n.precio * n.cantidad)
        setValorTotalVenta(valorTotal)
        setCliente(clientes.filter(n => n.id === id)[0])
    }

    const Venta = async () => {
        if(!(await comprobandoConexion())) {
            cartelError("Error De Conexion")
            return
        }

        const respuesta:boolean = await realizarVenta(id, seleccionado, valorTotalVenta, cantidad , sales[id_ventana].productos)
        
        if(!(respuesta)) {
            cartelError("Error a la Hora De Editar")
            return
        }

        cartelOk("Venta Realizada con Exito")
        dispatch(clean({id:id_ventana}))
        navigate(`/Ventas/${id_ventana}`)
    }

    const verPdf = () => {
        dispatch(modPath({
            id:id_ventana,
            newPath:`/Ventas/${id_ventana}/PDF/${id}/`
        }))
        navigate(`/Ventas/${id_ventana}/PDF/${id}/`)
    }

    const volver = () => {
        dispatch(modPath({
            id:id_ventana,
            newPath:`/Ventas/${id_ventana}/CargaProductos/${id}/`
        }))
        navigate(`/Ventas/${id_ventana}/CargaProductos/${id}/`)
    }

    return (
        <div className="boxTipoDeVenta">
            <h3>Finalizae venta</h3>
            <div className="centrado">
                <label>Selecciona el Tipo de venta</label>
                <select
                    style={{height: 40}}
                    name="select" 
                    onChange={(e) => {e.preventDefault(); setSeleccionado(e.target.value);}}> 
                    <option>
                        
                    </option>
                    <option value="completo">
                        venta pago completo  
                    </option>
                    <option value="parcial">
                        venta pago parcial
                    </option>
                    <option value="deber">
                        venta a deber   
                    </option>
                </select>
            </div>
            {seleccionado === 'parcial' && 
                <input
                    value={cantidad > valorTotalVenta ? valorTotalVenta : cantidad}
                    max={valorTotalVenta}
                    min={0}
                    type="number" 
                    placeholder="Monto del pago"
                    onChange={e => {e.preventDefault(); {
                        //@ts-ignore
                        e.nativeEvent.data !== undefined 
                        ? setCantidad(
                            Number(e.target.value) > valorTotalVenta 
                            ? valorTotalVenta 
                            : Number(e.target.value) < 0
                            ? 0 
                            : Number(e.target.value)
                        )
                        : ""
                    }}} 
                />
            }
            <div className="boxResumenDeVenta">
                <ul>
                    <p>Resumen</p>
                    <div>
                        <li>
                            <p>
                                Nombre: 
                            </p>
                            <p>
                                {cliente !== undefined && cliente.nombre}
                            </p>
                        </li>
                        <li>
                            <p>
                                Apellido: 
                            </p>
                            <p>
                                {cliente !== undefined && cliente.apellido}
                            </p>
                        </li>
                        <li>
                            <p>
                                Valor Total de Venta: 
                            </p>
                            <p>
                                ${valorTotalVenta}
                            </p>
                        </li>
                    </div>
                </ul>
            </div>
            <div className="d-flex flex-row" style={{alignItems:"center" , justifyContent:"start" ,  height: '5vh' , width:"70%" , marginTop:"5vh"}}>
                {cliente !== undefined && 
                <PDFDownloadLink className="btn"
                    document={
                        <Document 
                            Data={productos}
                            Compra={compra}
                            Total={valorTotalVenta}
                            Cliente={{
                                estado:true,
                                tipoVenta:"Consumidor Final",  
                                cliente:cliente,
                                localidad:"Malabrigo",
                                pago:"Contado",
                                etc: ""
                            }}
                            Propietario={{
                                duenio:"Amaro Cattrozzi",
                                direccion:"rivadavia 1557",
                                telefono:"3482650397",
                                gmail:"amaro7@gmail.com",
                                tipo:"C",
                                numero:"0000000001",
                                fecha:"09-12-18",
                                origen:"Orignal",
                                //imagen?:string
                            }}
                        />
                    } fileName="Venta.pdf"
                >
                    <img src={Dowload} height="30px" />
                </PDFDownloadLink>}
                <button className="btn" onClick={e => {e.preventDefault(); verPdf()}}>
                    <img src={Ver} height="30px" />
                </button>
            </div>
            <div className="boxButtomTipoDeVenta">
                <button onClick={e => {e.preventDefault() ; volver()}}>
                    Volver
                </button>
                <button 
                    style={{backgroundColor: `${
                        !(seleccionado === "" || (seleccionado === "parcial" && cantidad === 0 )) 
                        ? "green" 
                        : "red"}`}}
                    disabled={(
                        seleccionado === "" 
                        || (seleccionado === "parcial" && cantidad === 0 )) 
                    }
                    onClick={e => {
                        e.preventDefault() ; 
                        Venta()}}>
                    Finlizar Venta
                </button>
            </div>
        </div>
    )
}
