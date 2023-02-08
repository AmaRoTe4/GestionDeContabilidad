import axios from "axios";
import { Producto } from "../../interface";

const path:string = "http://localhost:7890/api/productos/"

//@ts-ignore
export const getAllProductos = async ():Producto[] | undefined => {
    try{
        const data = await axios.get(path)
        return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getProducto = async (id:number):Producto | undefined => {
    try{
        const data = await axios.get(path + id)
        return data.data[0]
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const updateProducto = async (id:number , data:Producto):boolean => {
    try{
        await axios.put(path + id , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const createProducto = async (data:Producto):boolean => {
    try{
        await axios.post(path , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

