
//aca  lo que se hace es mandar las ventas que nos deben, al agregar un monto de le resta a la factura mas vieja y si sobre se le resta a la siguiente

import { Table } from "react-bootstrap";
import { InterVentas } from "../../../../interface";
import { useEffect, useState } from "react";
import Data from "../dataPrueba.json"

//esto es individual al cliente
export default function CargarPago(){
    const [ventas , setVentas] = useState<InterVentas[]>(Data.filter(n => !n.pagado ))
    const [valorVentasTotal , setValorVentasTotal] = useState<number>(0);
    const [pago , setPago] = useState<number>(0);


    useEffect(() =>{
        //cargaVentas(setVentas , setPrecioTotal , setCantidadTotal)
        if(valorVentasTotal === 0) cargaTotales()
    },[])

    const cargaTotales = () => { 
        if(ventas.length === 0) return 
        ventas.map(n => {
            //@ts-ignore
            setValorVentasTotal(m => m + n.precio);
        })
    }

    return (
        <div style={{width: '100vw'}}>
            <div className="d-flex align-items-center" style={{
                    width: '100vw' , 
                    height: '10vh',
                }}>
                <div className="centrado" 
                    style={{
                        height: '80%' , 
                        backgroundColor:"rgb(200 ,200 ,200)",
                        borderRadius: '10px',
                        width: '100px',
                        marginLeft: '10px',
                    }}>
                    nombre
                </div>
            </div>
            <div className="centrado flex-column" style={{marginBottom: '5vh', marginTop: '5vh', width: '100vw'}}>
                <div className="barra-totales-ventas" style={{width: '80vw' ,backgroundColor: "black" , color: 'white'}}>
                    <div className='table-total-ventas' style={{width:'40%'}}>N°</div>
                    <div className='table-valor-ventas' style={{width:'20%'}}>Fecha</div>
                    <div className='table-valor-ventas' style={{width:'40%'}}>Valor Venta</div>
                </div>
                <Table striped bordered hover style={{width: '80vw'}}>
                    <tbody>
                        {ventas.length > 0 && 
                        ventas.map((n , i) =>  
                            <tr 
                                style={{height: '10px'}}
                                key={i} 
                                onClick={(e) => {e.preventDefault();}}
                            >
                                <td style={{width:'40%'}}>{n.id}</td>
                                <td style={{width:'20%'}} className='text-end'>{n.id}</td>
                                <td style={{width:'40%'}} className='text-end'>${n.precio}</td>
                            </tr> 
                        )}
                    </tbody>
                </Table>
                <div className="barra-totales-ventas" style={{width: '80vw' , backgroundColor: 'rgb(240 0 0)' , color: 'white'}}>
                    <div className='table-total-ventas' style={{width:'40%'}}>{ventas.length}</div>
                    <div className='table-valor-ventas' style={{width:'20%'}}>under</div>
                    <div className='table-valor-ventas' style={{width:'40%'}}>${valorVentasTotal / 2}</div>
                </div>
            </div>
            <div className="centrado" style={{flexDirection: "column" , height: '20vh'}}>
                <input 
                    type="number" 
                    style={{width: '30%' , textAlign:'end'}} 
                    value={pago}
                    onChange={e => setPago(Number(e.target.value))}
                />
                <button 
                    disabled={pago === 0} 
                    className="btn" 
                    style={{width: '30%' , marginTop: '5vh' , backgroundColor: "green" , color: 'white'}}
                >
                    Realizar pago
                </button>
            </div>
            <div className="d-flex justify-content-end align-items-end" style={{height: '18vh' , width: '95%'}}>
                <p style={{color: `${pago !== 0 && ((valorVentasTotal / 2) - pago) < 0 ? 'red' : 'green'}`}}>
                    {pago !== 0 && ((valorVentasTotal / 2) - pago) > 0 
                    ? `si realiza este pago , le quedara a deber ${(valorVentasTotal / 2) - pago}`
                    : ((valorVentasTotal / 2) - pago) < 0
                    ?  `si realiza este pago, le quedaremos a deber a el ${((valorVentasTotal / 2) - pago) * -1}`
                    : pago !== 0 && ((valorVentasTotal / 2) - pago) === 0
                    ? 'si realiza este pago todas las deudas quedaran saldadas'
                    : ""
                } 
                </p>
            </div>
        </div>
    )
}