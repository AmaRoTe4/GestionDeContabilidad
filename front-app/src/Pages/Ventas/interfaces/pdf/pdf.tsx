import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Cliente, ProductoDeVenta } from "../../../../../interface";
import { PDFViewer } from "@react-pdf/renderer";
import Documento from "./document";
import { modPath } from "../../../../store/elements/sales";

export default function PDF(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id_ventana = parseInt(useLocation().pathname.split('/')[2])
    const id:number = parseInt(useLocation().pathname.split('/')[4])
    //@ts-ignore
    const sales:VentanaDeVenta[] = useSelector((state) => state.sales)
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    const [cliente , setCliente] = useState<Cliente>()
    //@ts-ignore
    const productos:Producto[] = useSelector((state) => state.productos)
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

    const volver = () => {
        dispatch(modPath({
            id:id_ventana,
            newPath:`/Ventas/${id_ventana}/TipoDeVenta/${id}/`
        }))
        navigate(`/Ventas/${id_ventana}/TipoDeVenta/${id}/`)
    }

    return (
        <>
            {valorTotalVenta !== 0 && cliente !== undefined &&
            <PDFViewer style={{width: "100%" , height: "86vh" , margin:0 , padding: 0 , marginTop:'1px'}}>
                <Documento 
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
            </PDFViewer>}
            <div className="centrado" style={{marginBottom: 10 , marginTop: 10 , width: "100vw"}}>
                <button className="btn btn-danger" onClick={e => {e.preventDefault() ; volver()}}>
                        Volver
                </button>
            </div>
        </>
    )
}