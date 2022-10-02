import { ScrollView, Text, ImageBackground, StyleSheet, Button, View, Alert} from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import Bg from '../../../assets/images/final_mustang.jpg';
import CustomClassified from '../../components/CustomClassified';
import { AuthContext } from '../../Context/AuthContext';
import { TextInput } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Theme from '../../components/Theme';

const Classifieds = ({route, navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const [classifieds, setClassifieds] = useState([])
  const [search, setSearch] = useState("")
  const [priceLower, setPriceLower] = useState("0")
  const [priceHigher, setPriceHigher] = useState("1000000")
  const fetchClassifieds = () => {
    fetch(`http://142.93.231.219/classifieds`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setClassifieds(data.data)
      })
  }

  useEffect(()=>{
    fetchClassifieds();
  }, [])

  return (
    <ScrollView style={{ flex: 1}}>
      <ImageBackground source={Bg} resizeMode="cover" style={{
         flex: 1,
         justifyContent: "center"
      }}>
        <Text style={styles.text}>Classifieds</Text>
        <Button title="Add Classifieds" onPress={() => 
          userInfo?.token ? navigation.navigate('AddClassifieds') : 
          Alert.alert(
            "Kindly 'Sign In'",
            "If you dont have an account, please 'Register'",
            [
              {text: "Try Again"}
            ]
          )}>
          </Button>
        
      </ImageBackground>

      <View style={{padding: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: Theme.fontSize.tableHeader}}>Filters</Text>
          <Button title="Reset" onPress={() => {
            setSearch("");
            setPriceLower("0");
            setPriceHigher("1000000");
          }}>
          </Button>
        </View>

        <TextInput style={styles.inputText} label="Search Vehicle or Model" value={search} onChangeText={search => setSearch(search)} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.selectBox} >
            <Picker
                onValueChange={price => setPriceLower(price)}
                selectedValue={priceLower}
                >
                <Picker.Item label="Price From" value="0" />
                <Picker.Item label="10,000" value="10000" />
                <Picker.Item label="20,000" value="20000" />
                <Picker.Item label="30,000" value="30000" />
                <Picker.Item label="40,000" value="40000" />
                <Picker.Item label="50,000" value="50000" />
                <Picker.Item label="60,000" value="60000" />
                <Picker.Item label="70,000" value="70000" />
                <Picker.Item label="80,000" value="80000" />
                <Picker.Item label="90,000" value="90000" />
                <Picker.Item label="100,000" value="100000" />
                <Picker.Item label="150,000" value="150000" />
                <Picker.Item label="150,000 +" value="151,000" />
            </Picker>
          </View>
          <View style={styles.selectBox} >
            <Picker
                onValueChange={price => setPriceHigher(price)}
                selectedValue={priceHigher}
                >
                <Picker.Item label="Price To" value="1000000" />
                <Picker.Item label="10,000" value="10000" />
                <Picker.Item label="20,000" value="20000" />
                <Picker.Item label="30,000" value="30000" />
                <Picker.Item label="40,000" value="40000" />
                <Picker.Item label="50,000" value="50000" />
                <Picker.Item label="60,000" value="60000" />
                <Picker.Item label="70,000" value="70000" />
                <Picker.Item label="80,000" value="80000" />
                <Picker.Item label="90,000" value="90000" />
                <Picker.Item label="100,000" value="100000" />
                <Picker.Item label="150,000" value="150000" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={{padding: 15}}>
          <Text style={{fontSize: Theme.fontSize.tableHeader}}>Results</Text>
      </View>

      <View style={{flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-around"}}>
        { classifieds.length > 0 && (classifieds?.map((classified) => {
          var price = parseInt(classified.Price);
          if (search) {
            if (classified.Model.toLowerCase().includes(search.toLowerCase()) || classified.Vehicle_Manufacturer.toLowerCase().includes(search.toLowerCase())) {
              if (price > parseInt(priceLower) && price < parseInt(priceHigher)) {
                return <CustomClassified style={{flexWrap: 'wrap'}} key={classified?._id} navigation={navigation} data={classified} edit={userInfo.username === classified.Username ? true : false } />
              } 
            }
          } else {
            if (price > parseInt(priceLower) && price < parseInt(priceHigher)) {
              return <CustomClassified style={{flexWrap: 'wrap'}} key={classified?._id} navigation={navigation} data={classified} edit={userInfo.username === classified.Username ? true : false } />
            } 
          }
        }))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    //backgroundColor: "#000000c0"
  },
  inputText: {
    borderWidth: 1, 
    borderColor: Theme.colors.primary, 
    color: 'white', 
    marginVertical: 20,
    width: "100%"
  },  
  selectBox: {
      marginBottom: 10, borderColor: Theme.colors.primary, borderWidth: 1,  height: 60, padding: 0, width: 180
  },
})

export default Classifieds