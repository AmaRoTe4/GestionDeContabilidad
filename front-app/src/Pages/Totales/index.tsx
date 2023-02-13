import { useEffect, useState } from "react"
import { Producto, Categoria , Localidad , Cliente } from "../../../interface"
import { useDispatch, useSelector } from "react-redux"

export default function Totales(){
    //@ts-ignore
    const {productos , categorias , clientes , localidades} = useSelector((state) => state)

    return (
        <div>
            <ul>
                <h3>Producto</h3>
                {productos.length > 0 && productos.map((n:Producto) => 
                    <li>{n.nombre}</li>
                )}
            </ul>
            <ul>
                <h3>Categorias</h3>
                {categorias.length > 0 && categorias.map((n:Categoria) => 
                    <li>{n.nombre}</li>
                )}
            </ul>
            <ul>
                <h3>Clientes</h3>
                {clientes.length > 0 && clientes.map((n:Cliente) => 
                    <li>{n.nombre}</li>
                )}
            </ul>
            <ul>
                <h3>Localidades</h3>
                {localidades.length > 0 && localidades.map((n:Localidad) => 
                    <li>{n.nombre}</li>
                )}
            </ul>
        </div>
    )
}