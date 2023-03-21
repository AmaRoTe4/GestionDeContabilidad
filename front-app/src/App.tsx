import './App.css'
import {Route , BrowserRouter , Routes} from 'react-router-dom'
import Main from './Pages/Main/Main'
import Totales from './Pages/Totales/index'
import TotalesProductos from './Pages/Totales/windows/productos'
import TotalesResDia from './Pages/Totales/windows/resumenDiario'
import TotalesVentas from './Pages/Totales/windows/ventas'
import TotalesVentasPorId from './Pages/Totales/windows/ventaIndividual'
import TotalesClientes from './Pages/Totales/windows/clientes'
import Ventas from './Pages/Ventas/index'
import Ajustes from './Pages/Ajustes/index'
import Productos from './Pages/Productos/index'
import Producto from './Pages/Productos/acciones/Producto'
import Categoria from './Pages/Productos/acciones/Categoria'
import Clientes from './Pages/Clientes/index'
import Cliente from './Pages/Clientes/individual'
import Pagos from './Pages/Clientes/acciones/CargarPago'
import PagoFactura from './Pages/Clientes/acciones/CargaPagoFactura'
import Editar from './Pages/Clientes/acciones/Cliente'
import Localidad from './Pages/Clientes/acciones/Localidad'
import { BarraDeNavegacion } from "./components/BarraDeNavegacion";
import { ToastContainer} from 'react-toastify'
import { useSelector  , useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllProductos } from './store/elements/productos'
import { fetchAllLocalidades } from './store/elements/localidades'
import { fetchAllClientes } from './store/elements/clientes'
import { fetchAllCategorias } from './store/elements/categorias'

function App() {
	const dispatch = useDispatch()
	const [intentos , setIntentos] = useState<number>(0)

	useEffect(() => {
        if(intentos < 1) dataRedux()
    },[])
	
    const dataRedux = async () => {
        setIntentos(intentos + 1)
		//@ts-ignore
        await dispatch(fetchAllProductos())
        //@ts-ignore
        await dispatch(fetchAllLocalidades())
        //@ts-ignore
        await dispatch(fetchAllClientes())
        //@ts-ignore
        await dispatch(fetchAllCategorias())
    }

	return (
		<BrowserRouter>
			<BarraDeNavegacion />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/Totales/" element={<Totales />} />
				<Route path="/Totales/Ventas" element={<TotalesVentas />} />
				<Route path="/Totales/Ventas/:id" element={<TotalesVentasPorId />} />
				<Route path="/Totales/Productos" element={<TotalesProductos />} />
				<Route path="/Totales/Clientes" element={<TotalesClientes />} />
				<Route path="/Totales/Dias" element={<TotalesResDia />} />
				<Route path="/Productos/" element={<Productos />} />
				<Route path="/Productos/producto/:id" element={<Producto />} />
				<Route path="/Productos/categoria/:id" element={<Categoria />} />
				<Route path="/Ventas/:id" element={<Ventas />} />
				<Route path="/Ventas/:id/PDF/:id" element={<Ventas />} />
				<Route path="/Ventas/:id/CargaProductos/:id" element={<Ventas />} />
				<Route path="/Ventas/:id/TipoDeVenta/:id" element={<Ventas />} />
				{/*<Route path="/Ajustes" element={<Ajustes />} />*/}
				<Route path="/Clientes" element={<Clientes />} />
				{/* @ts-ignore */}
				<Route path="/Clientes/cliente/:id" element={<Cliente />} />
				<Route path="/Clientes/pagoFactura/:id" element={<PagoFactura />} />
				<Route path="/Clientes/pagos/:id" element={<Pagos />} />
				<Route path="/Clientes/acciones/:id" element={<Editar />} />
				<Route path="/Clientes/localidad/:id" element={<Localidad />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
