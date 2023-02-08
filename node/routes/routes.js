import {getAllCategorias,getCategorias,updateCategorias,createCategorias,deletCategorias} from '../controllers/categorias.js'
import {getAllVentas,getVentas,updateVentas,createVentas} from '../controllers/ventas.js'
import {getAllProductos,getProductos,updateProductos,createProductos} from '../controllers/productos.js'
import {getAllLocalidades,getLocalidades,updateLocalidades,createLocalidades,deletLocalidades} from '../controllers/localidades.js'
import {getAllClientes,getClientes,updateClientes,createClientes} from '../controllers/clientes.js'
import express from 'express'

const router = express.Router()

router.get('/categorias/', getAllCategorias);
router.get('/categorias/:id', getCategorias);
router.post('/categorias/', createCategorias);
router.delete('/categorias/:id', deletCategorias);
router.put('/categorias/:id', updateCategorias);

router.get('/clientes/', getAllClientes);
router.get('/clientes/:id', getClientes);
router.post('/clientes/', createClientes);
router.put('/clientes/:id', updateClientes);

router.get('/ventas/', getAllVentas);
router.get('/ventas/:id', getVentas);
router.post('/ventas/', createVentas);
router.put('/ventas/:id', updateVentas);

router.get('/localidades/', getAllLocalidades);
router.get('/localidades/:id', getLocalidades);
router.post('/localidades/', createLocalidades);
router.delete('/localidades/:id', deletLocalidades);
router.put('/localidades/:id', updateLocalidades);

router.get('/productos/', getAllProductos);
router.get('/productos/:id', getProductos);
router.post('/productos/', createProductos);
router.put('/productos/:id', updateProductos);

export default router;