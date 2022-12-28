import { useNavigate } from 'react-router-dom'
import { ResetDataBase } from '../../functions/https/index'
import { useState } from 'react'
import './styles.css'
import Swal from 'sweetalert2'

export default function Ajustes(){
    const navigate = useNavigate()
    const [contrasenia , setContrasenia] = useState<string>("")
    const clave = "adelante...123"

    //@ts-ignore
    const volverAMain = () => setTimeout( navigate('/') , 3000)

    return (
        <div className="containt100 d-flex flex-column align-items-center">
            <div className="box-formulario-reset">
                <form className="box-cantidad-ventas">
                    <label htmlFor="contrasenia">Clave</label>
                    <input
                        value={contrasenia} 
                        type="password" 
                        id="contrasenia" 
                        name="contrasenia" 
                        onChange={e => setContrasenia(e.target.value)} 
                    />
                </form>
            </div>
            <div className="box-btn-reset centrado">
                <button 
                    disabled={contrasenia !== clave} 
                    className="btn btn-danger btn-reset"
                    onClick={e => {e.preventDefault();ResetDataBase(); Swal.fire({
                        title: 'Elinada con Exito!',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    });volverAMain() }}
                >    
                    Reset
                </button>
            </div>
        </div>
    )
}