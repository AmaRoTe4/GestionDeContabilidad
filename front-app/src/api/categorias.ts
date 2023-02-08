import axios from "axios";
import { Categoria } from "../../interface";

const path:string = "http://localhost:7890/api/categorias/"

//@ts-ignore
export const getAllLCategorias = async ():Categoria[] | undefined => {
    try{
        const data = await axios.get(path)
        let Data = data.data.map((n:Categoria) => n.nombre);
        Data = Data.sort()
        let retorno:Categoria[] = []

        while(Data.length > 0){
            let aux = data.data.filter((n:Categoria) => n.nombre === Data[0])[0]
            retorno.push(aux)
            Data.shift()
        }

        return retorno
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getCategoria = async (id:number):Categoria | undefined => {
    try{
        const data = await axios.get(path + id)
        return data.data[0]
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const updateCategoria = async (id:number , data:Categoria):boolean => {
    try{
        await axios.put(path + id , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const createCategoria = async (data:Categoria):boolean => {
    try{
        await axios.post(path , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const deletCategoria = async (id:number):boolean => {
    try{
        await axios.delete(path + id)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}
