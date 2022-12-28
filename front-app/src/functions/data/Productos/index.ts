import { InterProductos, ProductoVendido } from "../../../../interface"
import { eliminarProducto } from "../../https/Productos"
import Swal from 'sweetalert2'

interface PropsAgreg {
    cantidad:number;
    eleSelc:InterProductos;
    prtsPorVender:InterProductos[],
    setPrtsPorVender:React.Dispatch<React.SetStateAction<InterProductos[]>>
    setTotal:React.Dispatch<React.SetStateAction<number[]>>
    setCantidad:React.Dispatch<React.SetStateAction<number>>
} 

export const AgreProducto = ({
    cantidad , 
    eleSelc , 
    prtsPorVender , 
    setPrtsPorVender , 
    setTotal , 
    setCantidad
}:PropsAgreg) =>{
    if(cantidad <= 0 || eleSelc.nombre === "") return

    const aux:InterProductos[] = AgregarProducto({prtsPorVender,cantidad,eleSelc})
    setPrtsPorVender([...aux])
    setTotal(n => [n[0]+cantidad , n[1]+cantidad*eleSelc.precio])
    setCantidad(1)
}

interface PropsAgregarProductos{
    prtsPorVender:InterProductos[],
    cantidad:number,
    eleSelc:InterProductos,
}

const AgregarProducto = ({
    prtsPorVender,
    cantidad,
    eleSelc,
}:PropsAgregarProductos):InterProductos[] => {
    let aux:InterProductos = prtsPorVender.filter(n => n.nombre === eleSelc.nombre)[0]

    if(aux !== undefined) aux.vendidos += cantidad
    else{
        aux = {
            id: eleSelc.id,
            nombre: eleSelc.nombre,
            precio: eleSelc.precio,
            vendidos: cantidad
        } 
    }

    let retorno:InterProductos[] = prtsPorVender.filter(n => n.nombre !== eleSelc.nombre)

    return [aux , ...retorno]
}

export const funcionesDeProcutos = (id:number , navigate:any) => {
    Swal.fire({
        text: 'Seleciona la Accion a realizar',
        icon: 'warning',
        input: 'password',
        inputAttributes: {
            autocomplete:'off',
            autocapitalize: 'off',
            autocorrect: 'off'
        },
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:'Borrar',
        cancelButtonText:'Editar',
    }).then((result:any) => {
        if(result.isConfirmed && result.value === "adelante...123" ) eliminarProducto(id)
        //@ts-ignore
        else if(result.dismiss === 'cancel') navigate(`Acciones/${id}`)
    })
}