import axios from "axios";

const path:string = "http://localhost:7890/"

//@ts-ignore
export const comprobandoConexion = async ():boolean => {
    try{
        const data = await axios.get(path)
        return data.data === "running"
    }catch(error){
        console.log(error)
        return false;
    }
}