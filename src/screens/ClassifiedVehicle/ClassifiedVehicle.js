import { ScrollView, StyleSheet, View, Alert, Animated, TextInput, TouchableOpacity } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { Button, Text } from 'react-native-paper';
import CustomCarousel from '../../components/CustomCarousel';
import Theme from '../../components/Theme';
import { DataTable } from 'react-native-paper';
import { AuthContext } from '../../Context/AuthContext';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const ClassifiedVehicle = ({route, navigation}) => {
    const {userInfo} = useContext(AuthContext);
    const ref = React.useRef();
    const [seller, setSeller] = useState(false)
    const [classified, setClassifieds] = useState()

    const getClassified = async () => {
      fetch(`http://142.93.231.219/classifieds/${route.params.id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setClassifieds(data.response)
      })
    }

      useEffect(()=>{
        getClassified();
      }, [])

  return (
    <AnimatedScrollView ref={ref} style={styles.root} stickyHeaderIndices={[4]} showsVerticalScrollIndicator={true}>
        <Text>Classifieds</Text>
        <CustomCarousel images={classified?.Images} />
        <View style={{width: '100%', paddingBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
            <DataTable>
                
                {classified && Object.keys(classified).map((x, index)=>{
                   return index === 0 || x === "__v" ||  x === "Images" || x === "Username" || x === "Added_Date" || x === "Seller_Contact" || x === "Seller_Name" ?  <></>:
                   x === "Product_Description" ? 
                   <View style={{marginVertical: 20}}>
                   <DataTable.Row key={index+x}>
                    <DataTable.Cell>Product Description</DataTable.Cell>
                   </DataTable.Row>
                   <View>
                    <Text style={{paddingHorizontal: 15}}>
                      {Array.isArray(classified[x]) ? "" : classified[x]}
                    </Text>
                   </View>
                   </View> :
                   (
                    <DataTable.Row key={index+x}>
                        <DataTable.Cell>{x.replace("_", " ")}</DataTable.Cell>
                        <DataTable.Cell>{Array.isArray(classified[x]) ? "" : classified[x]}</DataTable.Cell>
                    </DataTable.Row>)
                })}
            </DataTable>
        </View>
        <View style={styles.bidPanel}>
          <Button onPress={()=>{userInfo?.token ? (setSeller(!seller)) :     
          Alert.alert(
          "Kindly 'Sign In'",
          "If you dont have an account, please 'Register'",
          [
            {text: "Try Again"}
          ]
          )}}>Contact Seller</Button>
          {
          seller ? 
          <View style={{padding: 10}}>
            <DataTable>
              <DataTable.Row>
                  <DataTable.Cell>Seller</DataTable.Cell>
                  <DataTable.Cell style={{flex: 3}}>{classified?.Seller_Name}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                  <DataTable.Cell>Number</DataTable.Cell>
                  <DataTable.Cell style={{flex: 3}}>{classified?.Seller_Contact}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
          : <></>
          }
        </View>
  
        <View style={{paddingBottom: 20}}>

        </View>
    </AnimatedScrollView>
  )
}

const styles = StyleSheet.create({
    root: {    
      padding: 20,
    },
    timer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20
    },
    timerText: {
      fontSize: 38
    },
    buyNow: {
      fontSize: 25,
      textAlign: 'center',
      paddingVertical: 10
    },
    bidPanel: {
      padding: 10,
      backgroundColor: Theme.colors.primaryShadow,
      marginBottom: 20,
      marginTop: 20,
      borderRadius: 5
    },
    navHead: {
      position: 'relative'
    },
    navHeaderFixed: {
      position: 'absolute', 
      top: 0
    },
    bidText: {
      width: 110, 
      height: 40, 
      borderWidth: 1, 
      borderColor: Theme.colors.primary, 
      color: 'white', 
      paddingHorizontal: 10,
    },
    bidButton: { 
      borderWidth: 1, 
      height: 40, 
      borderColor: Theme.colors.primary, 
      width: 140,
      backgroundColor: Theme.colors.primary, 
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    timeBox: {
      backgroundColor: Theme.colors.primaryShadow,
      borderWidth: 2,
      borderColor: Theme.colors.primary,
      padding: 10,
      borderRadius: 10
    },
    priceBox: {
      borderWidth: 2,
      borderColor: Theme.colors.primary,
      padding: 10,
      borderRadius: 10,
      marginTop: 10
    }
  })
  

export default ClassifiedVehicle