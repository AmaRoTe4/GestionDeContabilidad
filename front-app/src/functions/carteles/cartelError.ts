import { Bounce, toast } from "react-toastify";

export const cartelError = (Mesanje:string) => {
    toast.error(Mesanje , {
        position: toast.POSITION.TOP_CENTER,
        transition: Bounce,
        autoClose:3000
    });
}