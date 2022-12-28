import {getAllProductos , getProductos , updateProductos , createProductos , deletProductos , getAllVentas , getVentas, createVentas , deletVentas} from '../controllers/controllers.js'
import express from 'express'

export const router1 = express.Router()
export const router2 = express.Router()
export const routerClean = express.Router()

router1.get('/', getAllVentas);
router1.get('/:id', getVentas);
router1.post('/', createVentas);
router1.delete('/:id', deletVentas);

router2.get('/', getAllProductos);
router2.get('/:id', getProductos);
router2.post('/', createProductos);
router2.delete('/:id', deletProductos);
router2.put('/:id', updateProductos);