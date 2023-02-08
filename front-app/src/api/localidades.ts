import axios from "axios";
import { Localidad } from "../../interface";

const path:string = "http://localhost:7890/api/localidades/"

//@ts-ignore
export const getAllLocalidades = async ():Localidad[] | undefined => {
    try{
        const data = await axios.get(path)
        let Data = data.data.map((n:Localidad) => n.nombre);
        Data = Data.sort()
        let retorno:Localidad[] = []

        while(Data.length > 0){
            let aux = data.data.filter((n:Localidad) => n.nombre === Data[0])[0]
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
export const getLocalidad = async (id:number):Localidad | undefined => {
    try{
        const data = await axios.get(path + id)
        return data.data[0]
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const updateLocalidad = async (id:number , data:Localidad):boolean => {
    try{
        await axios.put(path + id , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const createLocalidad = async (data:Localidad):boolean => {
    try{
        await axios.post(path , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const deletLocalidad = async (id:number):boolean => {
    try{
        await axios.delete(path + id)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}
