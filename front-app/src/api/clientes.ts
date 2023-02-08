import axios from "axios";
import { Cliente } from "../../interface";

const path:string = "http://localhost:7890/api/clientes/"

//@ts-ignore
export const getAllClientes = async ():Cliente[] | undefined => {
    try{
        const data = await axios.get(path)
        return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getCliente = async (id:number):Cliente | undefined => {
    try{
        const data = await axios.get(path + id)
        return data.data[0]
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const updateCliente = async (id:number , data:Cliente):boolean => {
    try{
        await axios.put(path + id , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const createCliente = async (data:Cliente):boolean => {
    try{
        await axios.post(path , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

