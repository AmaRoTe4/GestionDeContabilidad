import { useEffect, useState } from 'react';
import './styles.css'
import { Cliente, Localidad } from '../../../../interface';
import { getAllLocalidades } from '../../../api/localidades';
import Clientes from '../../../components/ventas/clientes';
import { useNavigate } from 'react-router-dom';

export default function SeleccionDeCliente(){
    const navigate = useNavigate()
    const [text , setText] = useState<string>("")
    const [cliente , setCliente] = useState<Cliente>({
        id:0,
        nombre:"",
        apellido:"",
        localidad:0,
        telefono:"",
        debe:0,
    })
    const [localidad , setLocalidad] = useState<number>(0)
    const [localidades , setLocalidades] = useState<Localidad[]>([])

    useEffect(() => {
        if(localidades.length === 0) allData()
    },[])

    const allData = async () => {
        const data:Localidad[] | undefined = await getAllLocalidades()
        if(data !== undefined) setLocalidades(data)
    } 

    const clear = () => {
        setText("")
    }

    return (
        <div className="boxSeleccionDeCliente">
            <h3>Seleccion al cliente</h3>
            <div>
                <label>Nombre</label>
                <input 
                    value={text} 
                    placeholder="Nombre"
                    onChange={e => setText(e.target.value)} 
                />
            </div>
            <div className="centrado">
                <label>Localidades</label>
                <select
                    name="select" 
                    onChange={(e) => {
                        e.preventDefault(); 
                        //@ts-ignore
                        setLocalidad(localidades.filter(n => n.nombre === e.target.value)[0].id)
                    }}>
                        {localidades.map((n , i) => 
                        <option key={i} value={n.nombre}>
                            {n.nombre}
                        </option>
                    )}
                </select>
            </div>
            <Clientes 
                data={text}
                localidad={localidad}
                cliente={cliente}
                setCliente={setCliente}
            />
            <button 
                disabled={cliente.id === 0}
                onClick={(e) => {e.preventDefault(); navigate(`/Ventas/CargaProductos/${cliente.id}`)}}
            >
                Aceptar
            </button>
        </div>
    )
}