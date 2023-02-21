import wifiOn from '../icons/wifiOn.svg'
import wifiOff from '../icons/wifiOff.svg'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Online } from '../functions/index'
import './styles.css'
import { comprobandoConexion } from '../api/comprobador'
import { useSelector } from 'react-redux'

export function BarraDeNavegacion(){
    const location = useLocation().pathname.split('/')
    const [timer , setTimer] = useState<number>(0)
    const [btnEstado , setBtnEstado] = useState<boolean>(false)
    const [dataBase , setDataBase] = useState<boolean>(false)
    //@ts-ignore
    const firstSale:VentanaDeVenta = useSelector((state) => state.sales)[0]
    
    //const [connection , setConnection] = useState<boolean>(true)

    useEffect(() => {
        //setConnection(Online())
        comprobation()
    }, [timer])

    const estado = async () => {
        setDataBase(await comprobandoConexion() === true)
    }

    const comprobation = async () => {
        estado()
        setTimeout(() => {
            setTimer((n) => n + 1)
        }, 5000)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light box-barra-de-navegacion">
            <div className="container-fluid">
                <button className={`navbar-toggler ${!btnEstado ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded={btnEstado} aria-label="Toggle navigation"
                onClick={e => {e.preventDefault() ; setBtnEstado(!btnEstado)}}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${btnEstado ? 'show' : ""}`} id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${location[1] === "" ? "red" : ""}`}} 
                                onClick={e => setBtnEstado(false)}
                            >Main</Link>
                        </li>
                        <li className={`nav-item`}>
                            <Link 
                                to="/Productos" 
                                className="nav-link active" 
                                aria-current="page" 
                                style={{
                                color: `${location[1] === 'Productos'  
                                ? "red" : ""}`}}
                                onClick={e => setBtnEstado(false)}
                            >Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/Clientes" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${location[1] === 'Clientes' ? "red" : ""}`}} 
                                onClick={e => setBtnEstado(false)}
                            >Clientes</Link>
                        </li>
                        <li className={`nav-item` }>
                            <Link 
                                to={`
                                    ${location[1] !== "Venta" 
                                    ? firstSale.id_cliente === -1 
                                        ? `/Ventas/${firstSale.id}` 
                                        : firstSale.path 
                                    : useLocation().pathname}`
                                } 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${location[1] === 'Ventas' ? 'red' : ''}`}} 
                                onClick={e => setBtnEstado(false)}
                            >Nueva Venta</Link>
                        </li>
                        <li className="nav-item"
                        >
                            <Link 
                                to="/Totales" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${
                                    location[1] === 'Totales'
                                    ? "red" 
                                    : ""}`}}
                                onClick={e => setBtnEstado(false)}
                                >Totales</Link>
                        </li>
                        {/*<li className="nav-item">
                            <Link 
                                to="/Ajustes" 
                                className="nav-link active" 
                                aria-current="page"
                                style={{color: `${location[1] === 'Ajustes' ? "red" : ""}`}} 
                                onClick={e => setBtnEstado(false)}
                            >Ajustes</Link>
                        </li>*/}
                    </ul>
                </div>
                {/*<img src={connection ? wifiOn : wifiOff} />*/}
                <img src={dataBase ? wifiOn : wifiOff} />
            </div>
        </nav>
    )
}