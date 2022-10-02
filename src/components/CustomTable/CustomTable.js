import * as React from 'react';
import { DataTable} from 'react-native-paper';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import Theme from '../Theme';
import { Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import search from '../../../assets/icons/search.png'
import carEngine from '../../../assets/icons/carEngine.png'
import carSeat from '../../../assets/icons/carSeat.png'
import coupeCar from '../../../assets/icons/coupeCar.png'
import coupeCar2 from '../../../assets/icons/coupeCar2.png'
import coupeCar3 from '../../../assets/icons/coupeCar3.png'
import protection from '../../../assets/icons/protection.png'
import rim from '../../../assets/icons/rim.png'
import steeringWheel from '../../../assets/icons/steeringWheel.png'
import tyres from '../../../assets/icons/tyres.png'
import windscreen from '../../../assets/icons/windscreen.png'
import light from '../../../assets/icons/light.png'
import generalDrivingCondition from '../../../assets/icons/generalDrivingCondition.png'
import door from '../../../assets/icons/door.png'
import driveAssist from '../../../assets/icons/driveAssist.png'
import parkAssist from '../../../assets/icons/parkAssist.png'
import warningLights from '../../../assets/icons/warningLights.png'
import cluster from '../../../assets/icons/cluster.png'

const icons = {
  'search': search,
  'carEngine': carEngine,        
  'carSeat': carSeat,
  'coupeCar': coupeCar,
  'coupeCar2': coupeCar2,        
  'coupeCar3': coupeCar3,        
  'protection': protection,      
  'rim': rim,
  'steeringWheel': steeringWheel,
  'tyres': tyres,
  'windscreen': windscreen,
  'light': light,
  'generalDrivingCondition': generalDrivingCondition,
  'door': door,
  'driveAssist': driveAssist,
  'parkAssist': parkAssist,
  'warningLights': warningLights,
  'cluster': cluster
}


const CustomTable = ({header, icon, values}) => {
  return (
    <View style={styles.root}>
      <DataTable>
        <DataTable.Header>
          <Image source={icons[icon]} style={styles.icon} resizeMode="contain" />
          <Text style={styles.header}>{header}</Text>
        </DataTable.Header>
      </DataTable>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
      <View>
      {
          values?.map((value, index) => 
            {
              return Object.values(value)[0][0] != undefined ? (
                <Text key={`${value}${index}`} style={styles.keyRow}>
    
                  <View style={[styles.text, styles.tableBorder]} width={200}><Text style={{fontSize: Theme.fontSize.text}}>{Object.keys(value)[0]}</Text></View>
        
                {
                  Object.values(value)[0].length > 0 ?
                      Object.values(value)[0].map((nest, index) => {
                        if (Array.isArray(nest)){
                          return nest.length > 0 ? <View key={`${header}${index}`} style={styles.text}><Text style={{fontSize: Theme.fontSize.text}}>{nest.includes('Original Paint') || nest.includes('Yes') || nest.includes('Good') ? <Entypo name={"controller-stop"} color={"green"} size={14} /> : nest.includes('Repainted') || nest.includes('Average') ? <Entypo name={"controller-stop"} color={"orange"} size={14} /> : nest.includes('Dented and Painted') || nest.includes('Damaged') ? <Entypo name={"controller-stop"} color={"red"} size={14} /> : null}{nest.join(', ')}</Text></View> : null 
                        } else {
                          return nest != undefined ? <View key={`${header}${index}`} style={styles.text}>
                            <Text style={{fontSize: Theme.fontSize.text}}>{nest === 'Good' || nest === 'Original Paint' || nest === 'None' || nest === 'Okay' ? <Entypo name={"controller-stop"} color={"green"} size={14} /> : nest === 'Average' || nest === 'Repainted' || nest === 'Yes (Minor)' || nest === 'Repaired' ? <Entypo name={"controller-stop"} color={"orange"} size={14} /> : nest === 'Damaged' || nest === 'Dented and Painted' || nest === 'Yes (Major)' ? <Entypo name={"controller-stop"} color={"red"} size={14} /> : null}
                            <Text style={{fontSize: Theme.fontSize.text}}>{nest ? nest : "Not provided"}</Text></Text></View> : null
                        }
                      }) 
                  : null
                }
  
              </Text>)
              : null
            }
          )
        }
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {    
    paddingBottom: 20,
    marginTop: 20
  },
  header: {
    fontSize: Theme.fontSize.tableHeader,
    marginLeft: 10,
    marginTop: 5,
    color: Theme.colors.primary,
    fontWeight: 'bold'
  },
  text: {
    padding: 15
  },
  icon: {
    width: 60,
    height: 85,
    marginTop: -25,
  },
  keyRow: {
    borderColor: Theme.colors.table, 
    borderStyle: 'solid', 
    borderWidth: 1, 
    fontSize: Theme.fontSize.text
  },
  tableBorder: {
    borderRightColor: Theme.colors.table, 
    borderRightWidth: 1
  }
})



export default React.memo(CustomTable);