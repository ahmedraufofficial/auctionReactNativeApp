import { ScrollView, Text, ImageBackground, StyleSheet, Button, View, Alert} from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import Bg from '../../../assets/images/final_mustang.jpg';
import CustomClassified from '../../components/CustomClassified';
import { AuthContext } from '../../Context/AuthContext';
import { TextInput } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Theme from '../../components/Theme';
import Menu from '../../components/Menu';

const Classifieds = ({route, navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const [classifieds, setClassifieds] = useState([])
  const [search, setSearch] = useState("")
  const [priceLower, setPriceLower] = useState(0)
  const [priceHigher, setPriceHigher] = useState(1000000)
  const [yearHigher, setYearHigher] = useState(parseInt(new Date().getFullYear()) + 1)
  const [yearLower, setYearLower] = useState(2000)
  const [sort, setSort] = useState("0")

  const fetchClassifieds = () => {
    fetch(`https://backend.carologyauctions.net/classifieds`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const filteredClassifieds = data.data.filter(classified => {
          const priceInRange = parseInt(classified.Price.replace(',', '')) >= priceLower && parseInt(classified.Price.replace(',', '')) <= priceHigher;
          const yearInRange = classified.Year >= yearLower && classified.Year <= yearHigher;
          return priceInRange && yearInRange;
        });

        if (sort !== "0") {
          const sortedClassifieds = filteredClassifieds.slice().sort((a, b) => {
            if (sort === "2") {
                return b.Price.replace(',', '') - a.Price.replace(',', '');
            } else if (sort === "1") {
                return a.Price.replace(',', '') - b.Price.replace(',', '');
            }
          }); 
            setClassifieds(sortedClassifieds)
        } else {
          setClassifieds(filteredClassifieds)
        }
      })
  }

  useEffect(()=>{
    fetchClassifieds();
  }, [priceHigher, priceLower, yearHigher, yearLower, sort])

  const handleYearFrom = (x) => {
    setYearLower(x)
  }
  
  const handleYearTo = (x) => {
    setYearHigher(x)
  }

  
  return (
    <ScrollView style={{ flex: 1}}>
      <ImageBackground source={Bg} resizeMode="cover" style={{
         flex: 1,
         justifyContent: "center"
      }}>
        <Menu navigation={navigation} />
        <Text style={styles.text}>Classifieds</Text>
   
        
      </ImageBackground>
      <Button style={styles.btn} title="Add Classifieds" onPress={() => 
          userInfo?.token ? navigation.navigate('AddClassifieds') : 
          Alert.alert(
            "Kindly 'Sign In'",
            "If you dont have an account, please 'Register'",
            [
              {text: "Try Again"}
            ]
          )}>
          </Button>


      <View style={{padding: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: Theme.fontSize.tableHeader}}>Filters</Text>
          <Button title="Reset" onPress={() => {
            setSearch("");
            setSort("0");
            setPriceLower(0);
            setPriceHigher(1000000);
            setYearLower(2000);
            setYearHigher(parseInt(new Date().getFullYear()) + 1);
          }}>
          </Button>
        </View>

        <TextInput style={styles.inputText} label="Search Vehicle or Model" value={search} onChangeText={search => setSearch(search)} />

        <View  style={styles.selectBox}  >
            <Picker
                onValueChange={value => setSort(value)}
                selectedValue={sort}
                >
                <Picker.Item label="Sort" value="0" />
                <Picker.Item label="Price: low to high" value="1" />
                <Picker.Item label="Price: high to low" value="2" />
            </Picker>
          </View>

        
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={styles.selectBox} >
            <Picker
                onValueChange={(price) => setPriceLower(parseInt(price))}
                selectedValue={priceLower.toString()}
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
                <Picker.Item label="150,000 +" value="151000" />
            </Picker>
          </View>
          <View style={styles.selectBox} >
            <Picker
                onValueChange={price => setPriceHigher(parseInt(price))}
                selectedValue={priceHigher.toString()}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={styles.selectBox} >
            <TextInput keyboardType="numeric" onChangeText={(itemValue) => {handleYearFrom(itemValue)}} value={yearLower} label='Year From' style={styles.inputText} />
          </View>
          <View style={styles.selectBox} >
            <TextInput keyboardType="numeric" onChangeText={(itemValue) => {handleYearTo(itemValue)}} value={yearHigher} label='Year To' style={styles.inputText} />
          </View>
        </View>
      </View>

      <View style={{padding: 15, zIndex: -100}}>
          <Text style={{fontSize: Theme.fontSize.tableHeader}}>Results</Text>
      </View>

      <View style={{flexDirection: 'row', flexWrap: "wrap", justifyContent: "space-around", zIndex: -100}}>
        {
          classifieds.length > 0 ? classifieds.map((classified) => {
            if (search) {
              if ((classified?.Model ? classified?.Model.toLowerCase().includes(search.toLowerCase()) : false) || classified?.Vehicle_Manufacturer.toLowerCase().includes(search.toLowerCase())) {
                return <CustomClassified style={{flexWrap: 'wrap'}} key={classified?._id} navigation={navigation} data={classified} edit={userInfo.username === classified.Username ? true : false } />
              }
            } else {
              return <CustomClassified style={{flexWrap: 'wrap'}} key={classified?._id} navigation={navigation} data={classified} edit={userInfo.username === classified.Username ? true : false } />
            }
          }) : null
        }

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
    marginBottom: 10, borderColor: Theme.colors.primary, borderWidth: 1, width: '100%', overflow: 'hidden', height: 60, flex: 1, justifyContent: 'center' 
  },
  btn: {
    marginTop: 20
  }
})

export default Classifieds