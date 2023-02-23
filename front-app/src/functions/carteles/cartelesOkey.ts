import { Bounce, toast } from "react-toastify";

export const cartelOk = (Mesanje:string) => {
    toast.success(Mesanje , {
        position: toast.POSITION.TOP_CENTER,
        transition: Bounce,
        autoClose:3000
    });
}