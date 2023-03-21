import {ModelVentas} from '../models/models.js';

export const getAllVentas = async (req, res) => {
    try{
        const modelos = await ModelVentas.findAll();
        console.log(typeof(modelos))
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

export const updateVentas = async (req, res) => {
    try{
        await ModelVentas.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createVentas = async (req, res) => {
    try{
        await ModelVentas.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}