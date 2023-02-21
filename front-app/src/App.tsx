import './App.css'
import {Route , BrowserRouter , Routes} from 'react-router-dom'
import Main from './Pages/Main/Main'
import Totales from './Pages/Totales/index'
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
import { useSelector  , useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAllProductos } from './store/elements/productos'
import { fetchAllLocalidades } from './store/elements/localidades'
import { fetchAllClientes } from './store/elements/clientes'
import { fetchAllCategorias } from './store/elements/categorias'

function App() {
	//@ts-ignore
	const {productos , categorias , clientes , localidades} = useSelector((state) => state)
	const dispatch = useDispatch()
	const [intentos , setIntentos] = useState<number>(0)

	useEffect(() => {
        if(
			(productos.length === 0 ||
			categorias.length === 0 ||
			clientes.length === 0 ||
			localidades.length === 0) && intentos < 300
		) dataRedux()
    },[localidades , productos , clientes , categorias])
	
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
				<Route path="/Productos/" element={<Productos />} />
				<Route path="/Productos/producto/:id" element={<Producto />} />
				<Route path="/Productos/categoria/:id" element={<Categoria />} />
				<Route path="/Ventas/:id" element={<Ventas />} />
				<Route path="/Ventas/:id/CargaProductos/:id" element={<Ventas />} />
				<Route path="/Ventas/:id/TipoDeVenta/:id" element={<Ventas />} />
				{/*<Route path="/Ajustes" element={<Ajustes />} />*/}
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
