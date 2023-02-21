import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { Cliente, Localidad, Venta } from "../../../interface"
import { useNavigate } from "react-router-dom";
import { getAllClientes } from "../../api/clientes"
import { filtroNombre } from "../../functions/clientes/obtenerClientes";
import { nombreLocalidadId } from "../../functions/localidad/obtenerLocalidad";
import { useSelector } from "react-redux";

interface Props{
    data:Venta[];
}

export const TablaDeVentas = ({data}:Props) => {
    return (
        <div style={{width: '100vw' , maxHeight: '30vh' , minHeight: '30vh' , overflowY: 'auto'}}>
            <Table striped bordered hover>
                <thead>
                    <tr className='table-dark'>
                        <th>N°</th>
                        <th>Fecha</th>
                        <th className="text-end">Valor de Compra</th>
                        <th className="text-end">Valor Abodano</th>
                        <th className="text-end">Diferencia</th>
                    </tr>
                </thead>
                <tbody> 
                    {data.map((n ,i) => 
                        <tr 
                            className={`${(n.valor_total - n.valor_abonado) !== 0 ? "ColorRed" : ""}`}
                            key={i}>
                            <td>{(i - data.length) * -1}</td>
                            <td>{n.createdAt !== undefined ? n.createdAt : "..."}</td>
                            <td className='text-end'>${n.valor_total}</td>
                            <td className='text-end'>${n.valor_abonado}</td>
                            <td className='text-end'>${n.valor_total - n.valor_abonado}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}