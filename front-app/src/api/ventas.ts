import axios from "axios";
import { Venta } from "../../interface";
import { darVueltaArray } from "../functions";

const path:string = "http://localhost:7890/api/ventas/"

//@ts-ignore
export const getAllVentas = async ():Venta[] | undefined => {
    try{
        const data = await axios.get(path)
        //@ts-ignore
        return darVueltaArray(data.data)
        //return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getVenta = async (id:number):Venta | undefined => {
    try{
        const data = await axios.get(path + id)
        return data.data[0]
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const updateVenta = async (id:number , data:Venta):boolean => {
    try{
        await axios.put(path + id , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const createVenta = async (data:Venta):boolean => {
    try{
        await axios.post(path , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}