import { useEffect, useState } from 'react';
import './styles.css'
import { Cliente, Localidad } from '../../../../interface';
import { getAllLocalidades } from '../../../api/localidades';
import Clientes from '../../../components/ventas/clientes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modIdCliente, modPath } from '../../../store/elements/sales';

export default function SeleccionDeCliente(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation().pathname
    const id_ventana:number = parseInt(useLocation().pathname.split('/')[2])
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
    //@ts-ignore
    const localidades:Localidad[] = useSelector((state) => state.localidades)

    const [key , setKey] = useState<string>()

    useEffect(() => {
        if(key === "Enter") aceptar()
    }, [key])
    
    document.addEventListener('keyup' , (e) =>{
        //e.preventDefault();
        //e.stopImmediatePropagation();
        
        setKey(e.key)
    })
    
    const aceptar = () => {
        if(cliente.id === 0) return
        dispatch(modPath({
            id:id_ventana,
            newPath:`${location}/CargaProductos/${cliente.id}`
        }))
        dispatch(modIdCliente({
            id:id_ventana,
            newId_cliente:cliente.id
        }))
        navigate(`${location}/CargaProductos/${cliente.id}`)
    }

    return (
        <div className="boxSeleccionDeCliente">
            <h3>Seleccion al cliente</h3>
            <div>
                <label>Nombre</label>
                <input 
                    value={text} 
                    placeholder="Nombre"
                    onChange={e => {setText(e.target.value)}} 
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
                onClick={(e) => {e.preventDefault(); aceptar()}}
            >
                Aceptar
            </button>
        </div>
    )
}