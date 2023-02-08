import {ModelCategorias} from '../models/models.js';

export const getAllCategorias = async (req, res) => {
    try{
        const modelos = await ModelCategorias.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getCategorias = async (req, res) => {
    try{
        const modelos = await ModelCategorias.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const updateCategorias = async (req, res) => {
    try{
        await ModelCategorias.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createCategorias = async (req, res) => {
    try{
        await ModelCategorias.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}

export const deletCategorias = async (req, res) => {
    try{
        await ModelCategorias.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: err.message});
    }
}