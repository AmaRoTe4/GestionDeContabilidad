import { Table } from 'react-bootstrap'
import Swal from "sweetalert2"
import { InterProductos } from "../../../interface"
import { BorrarProducto } from '../../functions/data/ventas'

interface Props{
    prtsPorVender:InterProductos[],   
    total:number[]
    setPrtsPorVender:React.Dispatch<React.SetStateAction<InterProductos[]>>,   
    setTotal:React.Dispatch<React.SetStateAction<number[]>>
}

export default function TablaVentas({prtsPorVender , total , setPrtsPorVender , setTotal}:Props){
    return (
        <div className="box-table-ventas">
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>N°</th>
                            <th>Producto</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prtsPorVender.map((n ,i ) => 
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
                                    if(result.isConfirmed) BorrarProducto(i , prtsPorVender , setPrtsPorVender , setTotal)
                                })

                            }}>
                                <td>{i+1}</td>
                                <td>{n.nombre}</td>
                                <td className='text-end'>{n.vendidos}</td>
                                <td className='text-end'>${n.vendidos * n.precio}</td>
                            </tr>
                        )}
                        <tr className="table-success">
                            <td>Total</td>
                            <td></td>
                            <td className='text-end'>{total[0]}</td>
                            <td className='text-end'>${total[1]}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
    )
}