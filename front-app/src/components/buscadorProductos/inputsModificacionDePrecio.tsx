import { Producto } from "../../../interface";

interface Props {
    cant:number;
    setCant:React.Dispatch<React.SetStateAction<number>>
    mod:number;
    setMod:React.Dispatch<React.SetStateAction<number>>
    productoAdd:Producto;
    text:string;
    max:boolean;
    referencia:React.RefObject<HTMLInputElement>
}

export default function InputPrecio(
    {
        cant,
        setCant,
        mod,
        setMod,
        productoAdd,
        text,
        max,
        referencia
    }:Props
){
    return (
        <div className="box-cantidad-ventas" style={{marginTop:"2vh"}}>
                <label
                    style={{textAlign: "start" , width: "80%"}}
                >
                    {text}s
                </label>
                <div style={{
                    display: "flex" ,
                    alignItems: "center", 
                    justifyContent: "space-between" , 
                    width: "80%" , 
                }}>
                    <input
                        placeholder={text}
                        ref={referencia}
                        style={{textAlign: "end" , width: "90%"}}
                        value={cant} 
                        type="number"
                        id={text} 
                        name={text}
                        min={0} 
                        max={
                            mod === 0 && max ? 100 : max ? productoAdd.precio : 100000000 
                        } 
                        onChange={e => {e.preventDefault() ; 
                            //@ts-ignore 
                            e.nativeEvent.data !== undefined ?
                            setCant(
                                Number(e.target.value) > 100 && mod === 0 && max
                                ? 100 
                                : Number(e.target.value) > productoAdd.precio && max
                                ? productoAdd.precio
                                : Number(e.target.value)
                                )
                            : ""
                            }}
                    />
                    <button className="btn btn-dark" onClick={e => {e.preventDefault() ; setMod(n => n === 0 ? 1 : 0)}}>
                        {mod === 0 ? "%" : "Precio"}
                    </button>
                </div>
            </div>
    )
}