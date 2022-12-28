import {ModelVentas , ModelProdcutos} from '../models/models.js';

export const getAllVentas = async (req, res) => {
    try{
        const modelos = await ModelVentas.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getVentas = async (req, res) => {
    try{
        const modelos = await ModelVentas.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

//export const updateVentas = async (req, res) => {
//    try{
//        await ModelVentas.update(req.body , {
//            where: {
//                id: req.params.id
//            }
//        });
//        res.json({"message":"actualizado con exitos"});
//    }catch(err){
//        res.json({message: err.message});
//    }
//}

export const createVentas = async (req, res) => {
    try{
        await ModelVentas.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}

export const deletVentas = async (req, res) => {
    try{
        await ModelVentas.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const getAllProductos = async (req, res) => {
    try{
        const modelos = await ModelProdcutos.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getProductos = async (req, res) => {
    try{
        const modelos = await ModelProdcutos.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const updateProductos = async (req, res) => {
    try{
        await ModelProdcutos.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createProductos = async (req, res) => {
    try{
        await ModelProdcutos.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}

export const deletProductos = async (req, res) => {
    try{
        await ModelProdcutos.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: err.message});
    }
}