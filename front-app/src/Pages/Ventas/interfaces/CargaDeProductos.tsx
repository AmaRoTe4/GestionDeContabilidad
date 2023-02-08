import '../styles.css'
import { useEffect, useState } from 'react'
import { InterProductos , } from "../../../../interface"
import TablaVentas from '../../../components/ventas/tabla';
import { Bounce, toast } from 'react-toastify'
import BuscadorProductos from '../../../components/buscadorProductos';

interface Props{
    id:number
    setId: React.Dispatch<React.SetStateAction<number>>
}

export default function CargaDeProductos({id , setId}:Props){
    const [cantidad , setCantidad] = useState<number>(1)
    const [total , setTotal] = useState<number[]>([0,0])
    const [prtsPorVender , setPrtsPorVender] = useState<InterProductos[]>([
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        },
        {
            id:0,
            precio:0,
            nombre:'amaro',
            vendidos:0,
        }
    ])
    const [elementos , setElementos] = useState<InterProductos[]>([])
    const [eleSelc , setEleSelc] = useState<InterProductos>({
        id:0,
        nombre:'',
        precio:0,
        vendidos:0
    })
    
    const limpiar = () => {
        setTotal([0,0])
        setPrtsPorVender([])
    }

    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-nombre-cliente">
                <h4>NombreDelCliente</h4>
            </div>
            <BuscadorProductos />
            <div className="box-cantidad-ventas">
                <input 
                    placeholder='cantidad'
                    style={{textAlign: "end"}}
                    value={cantidad} 
                    type="number" 
                    id="precio" 
                    name="precio" 
                    onChange={e => setCantidad(e.target.value !== "" ? parseInt(e.target.value) : 0)} 
                />
            </div>
            <div className="box-agregar-ventas centrado">
                <button type="button" onClick={e => {e.preventDefault(); }}>
                    Agregar
                </button>
            </div>
            <TablaVentas
                total={total}
                setTotal={setTotal}
                prtsPorVender={prtsPorVender}
                setPrtsPorVender={setPrtsPorVender}
            />
            <div className="box-bottones-ventas">
                <button 
                    className="btn btn-success" 
                    onClick={e => {
                        e.preventDefault(); 
                        toast.success("Venta Realizada" , {
                            position: toast.POSITION.TOP_CENTER,
                            transition: Bounce
                        }); setId(2)
                }}>
                        Realizar Venta
                </button>
                <button 
                    className="btn btn-danger" 
                    onClick={e => {e.preventDefault(); limpiar()}}>
                        Cancelar
                </button>
            </div>
        </div>
    )
}