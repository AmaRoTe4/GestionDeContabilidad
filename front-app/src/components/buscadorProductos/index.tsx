import { useState } from "react";
import '../styles.css'

const BuscadorProductos = () => {
    const [productos , setProdutos] = useState<number[]>([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14])
    
    return (
        <div className="box-buscador-productos">
            <input placeholder="Productos" />
            <ul>
                {productos.map((n , i) => 
                    <li 
                        key={i} 
                        onClick={(e) => {e.preventDefault();}}
                    >
                        <p>
                            {n}
                        </p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default BuscadorProductos