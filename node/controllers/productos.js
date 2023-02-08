import {ModelProductos} from '../models/models.js';

export const getAllProductos = async (req, res) => {
    try{
        const modelos = await ModelProductos.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getProductos = async (req, res) => {
    try{
        const modelos = await ModelProductos.findAll({
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
        await ModelProductos.update(req.body , {
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
        await ModelProductos.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}