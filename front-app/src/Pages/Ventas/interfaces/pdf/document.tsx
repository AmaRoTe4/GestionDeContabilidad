import { Page, View, Document , StyleSheet} from "@react-pdf/renderer";
import { DataProductos } from "./productos/productos";
import { DataPropietario } from "./cabecera/Propietario";
import { DataCliente } from "./cabecera/Cliente";
import { useEffect, useState } from "react";
import { BoletaCliente, BoletaPropietario, Producto, ProductoDeVenta, Venta } from "../../../../../interface";
import { Cliente } from "../../../../../interface";
import { useSelector } from "react-redux";

//@ts-ignore
const styles = StyleSheet.create({
    margen: {
      margin: 15,
      flexDirection: 'column',
    }
  });

interface Props{
    Data:Producto[]
    Compra:ProductoDeVenta[]
    Total:number
    Cliente:BoletaCliente
    Propietario:BoletaPropietario
}

//id:number;
//cantidad: number;
//precio:number;

export default function Documento({
    Data,
    Compra,
    Total,
    Cliente,
    Propietario
}:Props){
    const [productos , setProductos] = useState<ProductoDeVenta[][]>([[]]);

    useEffect(() => {
        divicionDeData()
    },[])

    const divicionDeData = () => {
        let data = Compra.map(n => {
            return {
                id:n.id,
                cantidad:n.cantidad,
                precio:n.precio,
                nombre:Data.filter(m => m.id === n.id)[0].nombre,
            }
        });
        let retorno:ProductoDeVenta[][] = [[]]

        let contador = 0
        let index = 0

        while(0 < data.length) {
            let aux = data.shift()
            
            if(aux === undefined) return
            
            retorno[index].push(aux)
            
            if(contador === 32){
                index++;
                contador = 0;
                retorno.push([])
            }else{
                contador++
            }
        }

        setProductos(retorno)
    }

    return (
        <Document>
            {productos[0].length > 0 && productos.map((n , i) => 
                <Page size="A4" key={i}>
                  <View style={styles.margen}>
                    <DataPropietario data={Propietario} numeroHoja={i + 1} />
                    <DataCliente data={Cliente} />
                    <DataProductos 
                        data={n} 
                        total={Total}
                        hoja={i}
                    />
                  </View>
                </Page>
            )}
        </Document>
    )
}