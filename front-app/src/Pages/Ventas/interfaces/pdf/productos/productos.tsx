import React from 'react';
import { Text, View, StyleSheet} from '@react-pdf/renderer'; 
import { Cliente, Producto, ProductoDeVenta } from '../../../../../../interface';
import { useSelector } from 'react-redux';
import { getProducto } from '../../../../../api/productos';

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    height: '70vh',
    width: '100%',
  },bodyProductos:{
    height: '65vh',
    borderTop:1,
    borderBottom:1,
    borderColor:"black",
    borderStyle:"solid",
  },bodyTotal:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '5vh',
  },text:{
    fontSize: 12,
  },textResaltado:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },casilla:{
    height: '2vh',
    flexDirection: "row",
    width: '100%',
  }
});

interface Props{
    data:ProductoDeVenta[]
    total:number
    hoja:number
}

export const DataProductos = ({data , total , hoja}:Props) => {

    //@ts-ignore
    const obtenerNombre = async (id:number):string => {
        const resultado = await getProducto(id);
        if(resultado === undefined) return ""
        return resultado.nombre
    }

    return (
        <View style={styles.body}>
          <View style={styles.bodyProductos}>
              <View style={{maxHeight: '66vh', marginTop: "2vh" , marginBottom: "2vh" , marginRight: "10px" , marginLeft: "10px"}}>
                  <View style={{...styles.casilla ,  backgroundColor: 'rgba(55,55,55,1)'}}>
                      <View style={{width:"8%"}}>
                          <Text style={{fontSize: 12 , color: "white" , width: "100%" , marginLeft: 5}}>
                              N°
                          </Text>
                      </View>
                      <View style={{width:"47%"}}>
                          <Text style={{fontSize: 12 , color: "white" , width: "100%"}}>
                              Nombre
                          </Text>
                      </View>
                      <View style={{width:"15%" , alignItems:"flex-end"}}>
                          <Text style={{fontSize: 12 , color: "white" , textAlign:"right" , width: "100%"}}>
                              Cantidad
                          </Text>
                      </View>
                      <View style={{width:"15%" , alignItems:"flex-end"}}>
                          <Text style={{fontSize: 12 , color: "white" , textAlign:"right" , width: "100%"}}>
                              Precio
                          </Text>
                      </View>
                      <View style={{width:"15%" , alignItems:"flex-end"}}>
                          <Text style={{fontSize: 12 , color: "white" , textAlign:"right" , width: "100%" , marginRight: 5}}>
                              Sub Total
                          </Text>
                      </View>
                  </View>
                  {data.map((n , i) => 
                      <View style={styles.casilla}>
                          <View style={{width:"8%"}}>
                              <Text style={{fontSize: 12 , width: "100%" , marginLeft: 5}}>
                                  {i + 1 + hoja * 33}
                              </Text>
                          </View>
                          <View style={{width:"47%"}}>
                              <Text style={{fontSize: 12 , width: "100%"}}>
                                  {n?.nombre}
                              </Text>
                          </View>
                          <View style={{width:"15%" , alignItems:"flex-end"}}>
                              <Text style={{fontSize: 12 , textAlign:"right" , width: "100%"}}>
                                  {n.cantidad}
                              </Text>
                          </View>
                          <View style={{width:"15%" , alignItems:"flex-end"}}>
                              <Text style={{fontSize: 12 , textAlign:"right" , width: "100%"}}>
                                  ${n.precio}
                              </Text>
                          </View>
                          <View style={{width:"15%" , alignItems:"flex-end"}}>
                              <Text style={{fontSize: 12 , textAlign:"right" , width: "100%" , marginRight: 5}}>
                                  ${n.precio * n.cantidad}
                              </Text>
                          </View>
                      </View>
                  )}
              </View>
          </View>
          <View style={styles.bodyTotal}>
              <Text style={{textAlign: "right" , marginRight: 10}}>Total: ${total}</Text>
          </View>
        </View>
    )
}