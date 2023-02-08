import {ModelLocalidades} from '../models/models.js';

export const getAllLocalidades = async (req, res) => {
    try{
        const modelos = await ModelLocalidades.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getLocalidades = async (req, res) => {
    try{
        const modelos = await ModelLocalidades.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const updateLocalidades = async (req, res) => {
    try{
        await ModelLocalidades.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createLocalidades = async (req, res) => {
    try{
        await ModelLocalidades.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}

export const deletLocalidades = async (req, res) => {
    try{
        await ModelLocalidades.destroy({
            where: {id: req.params.id}
        });
        res.json({"message":"fue eleminado con exito"});
    }catch(err){
        res.json({message: err.message});
    }
}