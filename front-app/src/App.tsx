import './App.css'
import {Route , BrowserRouter , Routes} from 'react-router-dom'
import Main from './Pages/Main/Main'
import Totales from './Pages/Totales/index'
import VentasTotales from './Pages/Totales/Ventas'
import VentasTotalesIndividual from './Pages/Totales/Venta'
import Ventas from './Pages/Ventas/index'
import Ajustes from './Pages/Ajustes/index'
import Productos from './Pages/Productos/index'
import Producto from './Pages/Productos/acciones/Producto'
import Categoria from './Pages/Productos/acciones/Categoria'
import Clientes from './Pages/Clientes/index'
import Cliente from './Pages/Clientes/acciones/Cliente'
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
				<Route path="/Totales/Ventas" element={<VentasTotales />} />
				<Route path="/Totales/VentasIndividuales/:id" element={<VentasTotales />} />
				<Route path="/Totales/Ventas/:id" element={<VentasTotalesIndividual />} />
				<Route path="/Productos/" element={<Productos />} />
				<Route path="/Productos/producto/:id" element={<Producto />} />
				<Route path="/Productos/categoria/:id" element={<Categoria />} />
				<Route path="/Ventas" element={<Ventas />} />
				<Route path="/Ajustes" element={<Ajustes />} />
				<Route path="/Clientes" element={<Clientes />} />
				<Route path="/Clientes/cliente/:id" element={<Cliente />} />
				<Route path="/Clientes/localidad/:id" element={<Localidad />} />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
