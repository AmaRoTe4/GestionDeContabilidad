import {ModelClientes} from '../models/models.js';

export const getAllClientes = async (req, res) => {
    try{
        const modelos = await ModelClientes.findAll();
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const getClientes = async (req, res) => {
    try{
        const modelos = await ModelClientes.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(modelos);
    }catch(err){
        res.json({message: err.message});
    }
}

export const updateClientes = async (req, res) => {
    try{
        await ModelClientes.update(req.body , {
            where: {
                id: req.params.id
            }
        });
        res.json({"message":"actualizado con exitos"});
    }catch(err){
        res.json({message: err.message});
    }
}

export const createClientes = async (req, res) => {
    try{
        await ModelClientes.create(req.body);
        res.json({"message":"fue creado con exito" });
    }catch(err){
        res.json({message: err.message});
    }
}