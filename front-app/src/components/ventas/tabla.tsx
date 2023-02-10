import { Table } from 'react-bootstrap'
import Swal from "sweetalert2"
import { Producto, ProductoDeVenta, ProductoDeVentaVista } from "../../../interface"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { nombreProductoId , nombreProductoNombre } from '../../functions/productos/obtenerProductos'
import { getAllProductos } from '../../api/productos'
import { removeProducts } from '../../store/elements/sales'

interface Props{
    actualization:number;
    setActualization: React.Dispatch<React.SetStateAction<number>>
    productos:Producto[]
}

export default function TablaVentas({actualization , setActualization , productos}:Props){
    const dispatch = useDispatch()
    //@ts-ignore
    const sales:ProductoDeVenta[] = useSelector((state) => state.sales)
    const [productosVista , setProductosVista] = useState<ProductoDeVentaVista[]>([])
    const [cantidadTotal , setCantidadTotal] = useState<number>(0)
    const [precioTotal , setPrecioTotal] = useState<number>(0)

    useEffect(() => {
        const aux:ProductoDeVentaVista[] = sales.map(n => 
            {
                return {
                    nombre: nombreProductoId(n.id !== undefined ? n.id : 0 , productos),
                    cantidad: n.cantidad,
                    precio: n.precio,
                }
            }
        )
        setProductosVista(aux)
        CargaDeValores(aux)
    },[actualization])

    const CargaDeValores = (aux:ProductoDeVentaVista[]) => {
        let cantidad:number = 0
        let precio:number = 0
        aux.map(n => {
            cantidad += n.cantidad
            precio += n.precio * n.cantidad
        })
        setPrecioTotal(precio)
        setCantidadTotal(cantidad)
    }

    const Eliminar = (id:number) => {
        dispatch(removeProducts(id))
        setActualization(n => n + 1)
    }

    return (
        <div className="box-table-ventas">
            <Table striped bordered hover>
                <thead>
                    <tr className='table-dark'>
                        <th>N°</th>
                        <th>Producto</th>
                        <th className="text-end">Cantidad</th>
                        <th className="text-end">Precio Unit</th>
                        <th className="text-end">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {productosVista.map((n ,i ) => 
                        <tr key={i} onClick={(e) => {e.preventDefault(); 
                        
                            Swal.fire({
                                title: 'Advertencia!',
                                text: 'Estas seguro de querer borrar Este Articulo?',
                                icon: 'warning',
                                showCloseButton: true,
                                showCancelButton: true,
                                confirmButtonText:'Borrar',
                                cancelButtonText:'Cancelar',
                            }).then((result) => {
                                if(result.isConfirmed) Eliminar(nombreProductoNombre(n.nombre , productos))
                            })
                        }}>
                            <td>{i+1}</td>
                            <td>{n.nombre}</td>
                            <td className='text-end'>{n.cantidad}</td>
                            <td className='text-end'>${n.precio}</td>
                            <td className='text-end'>${n.precio * n.cantidad}</td>
                        </tr>
                    )}
                    <tr className="table-success">
                        <td>Total</td>
                        <td></td>
                        <td className='text-end'>
                            {cantidadTotal}
                        </td>
                        <td></td>
                        <td className='text-end'>
                            ${precioTotal}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}