import { cartelError } from "../carteles/cartelError"

export const obtenerPrecio = (
    descuento:number,
    cantDes:number,
    recargo:number,
    cantRec:number,
    precio:number
):number => {
    if(cantDes === 0 && cantRec === 0) return precio 

    if(cantDes !== 0 && cantRec !== 0) {
        cartelError("El Descuento y el Recargo fueron invalidados...")
        return precio 
    }

    if(cantDes !== 0 && descuento === 0) return precio - (precio * (cantDes / 100))
    if(cantDes !== 0 && descuento !== 0) return precio - cantDes
    if(cantRec !== 0 && recargo === 0) return precio + (precio * (cantRec / 100))
    if(cantRec !== 0 && recargo !== 0) return precio + cantRec

    return 0;
}