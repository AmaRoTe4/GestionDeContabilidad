import React from 'react';
import { Text, View, StyleSheet} from '@react-pdf/renderer';
import { BoletaCliente } from '../../../../../../interface';

const styles = StyleSheet.create({
  cabecera: {
    paddingBottom:15,
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },blockStandar:{
    flexDirection: 'column',
    width: '100%',
  },text:{
    fontSize: 12,
  },textResaltado:{
    width:"100%",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  }
});

interface Props{
  data:BoletaCliente
}

export const DataCliente = ({data}:Props) => {
  return (
    <View style={styles.cabecera}>
        <View style={styles.blockStandar}>

            <Text style={styles.textResaltado}>{data.tipoVenta}</Text>
            {data.estado && 
              <View style={{width:"100%"}}>
                <Text style={styles.text}>Cliente: {data.cliente.nombre} {data.cliente.apellido}</Text>
                <Text style={styles.text}>Número de Cliente: {data.cliente.id}</Text>
              </View>
            }
            <Text style={styles.text}>{data.localidad}</Text>
            <Text style={styles.text}>Pago al {data.pago}</Text>

        </View>
    </View>
  );
}
  