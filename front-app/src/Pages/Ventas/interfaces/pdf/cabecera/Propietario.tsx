import React from 'react';
import fotoTitulo from "/images/titulo.png";
import { Text, View, StyleSheet , Image} from '@react-pdf/renderer';
import { BoletaPropietario } from '../../../../../../interface';

const styles = StyleSheet.create({
  cabecera: {
    borderBottom:1,
    borderColor:"black",
    borderStyle:"solid",
    paddingBottom:5,
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },imagen:{
    height: '50px',
    width: '90px',
  },blockStandar:{
    flexDirection: 'column',
    width: '33%',
  },blockStandarCentrado:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
  },text:{
    fontSize: 12,
  }
});


interface Props{
  data:BoletaPropietario
  numeroHoja:number
}

export const DataPropietario = ({data , numeroHoja}:Props) => {
  return (
  <View style={styles.cabecera}>

      <View style={styles.blockStandar}>

          <View style={{minHeight: 50}}>
              {data.imagen !== undefined &&
              <Image 
                src={data.imagen} 
                style={styles.imagen}
                fixed={true}
              />}
          </View>

          <Text style={{...styles.text , marginLeft: 5}}>de {data.duenio}</Text>
          <Text style={{...styles.text , marginLeft: 5}}>{data.direccion}</Text>
          <Text style={{...styles.text , marginLeft: 5}}>{data.telefono}</Text>
          <Text style={{...styles.text , marginLeft: 5}}>{data.gmail}</Text>

      </View>
      <View style={styles.blockStandarCentrado}>

          {/* B o C */}
          <Text style={{fontSize: 50}}>{data.tipo}</Text>

      </View>
      <View style={styles.blockStandar}>

          <View style={{height: 50}} />
          <Text style={styles.text}>N° {data.numero}</Text>
          <Text style={styles.text}>Fecha: {data.fecha}</Text>
          <Text style={styles.text}>{data.origen}</Text>
          <Text style={styles.text}>Número de hoja: {numeroHoja}</Text>

      </View>

  </View>
  );
}