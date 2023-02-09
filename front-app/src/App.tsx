import './App.css'
import {Route , BrowserRouter , Routes} from 'react-router-dom'
import Main from './Pages/Main/Main'
import Totales from './Pages/Totales/index'
import VentaNumerada from './Pages/Totales/Venta'
import TodasVentas from './Pages/Totales/Ventas'
import Ventas from './Pages/Ventas/index'
import Ajustes from './Pages/Ajustes/index'
import Productos from './Pages/Productos/index'
import Producto from './Pages/Productos/acciones/Producto'
import Categoria from './Pages/Productos/acciones/Categoria'
import Clientes from './Pages/Clientes/index'
import Cliente from './Pages/Clientes/individual'
import Pagos from './Pages/Clientes/acciones/CargarPago'
import Editar from './Pages/Clientes/acciones/Cliente'
import Localidad from './Pages/Clientes/acciones/Localidad'
import { BarraDeNavegacion } from "./components/BarraDeNavegacion";
import { ToastContainer} from 'react-toastify'

function App() {
	return (
		<BrowserRouter>
			<BarraDeNavegacion />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/Totales/" element={<Totales />} />
				<Route path="/Totales/Ventas" element={<TodasVentas />} />
				<Route path="/Totales/Ventas/:id" element={<VentaNumerada />} />
				<Route path="/Productos/" element={<Productos />} />
				<Route path="/Productos/producto/:id" element={<Producto />} />
				<Route path="/Productos/categoria/:id" element={<Categoria />} />
				<Route path="/Ventas" element={<Ventas />} />
				<Route path="/Ventas/CargaProductos/:id" element={<Ventas />} />
				<Route path="/Ventas/TipoDeVenta/:id" element={<Ventas />} />
				<Route path="/Ajustes" element={<Ajustes />} />
				<Route path="/Clientes" element={<Clientes />} />
				{/* @ts-ignore */}
				<Route path="/Clientes/cliente/:id" element={<Cliente />} />
				<Route path="/Clientes/pagos/:id" element={<Pagos />} />
				<Route path="/Clientes/acciones/:id" element={<Editar />} />
				<Route path="/Clientes/localidad/:id" element={<Localidad />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
