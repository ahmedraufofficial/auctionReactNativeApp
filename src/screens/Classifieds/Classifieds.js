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
  const [priceLower, setPriceLower] = useState("0")
  const [priceHigher, setPriceHigher] = useState("1000000")
  const [yearHigher, setYearHigher] = useState("2100")
  const [yearLower, setYearLower] = useState("1900")
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
        <Menu navigation={navigation} />
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
            setYearLower("1900");
            setYearHigher("2100");
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.selectBox} >
            <Picker
                onValueChange={year => setYearLower(year)}
                selectedValue={yearLower}
                >
                <Picker.Item label="Year From" value="1900" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2018" value="2018" />
                <Picker.Item label="2017" value="2017" />
                <Picker.Item label="2016" value="2016" />
                <Picker.Item label="2015" value="2015" />
                <Picker.Item label="2014" value="2014" />
                <Picker.Item label="2013" value="2013" />
                <Picker.Item label="2012" value="2012" />
                <Picker.Item label="2011" value="2011" />
                <Picker.Item label="2010" value="2010" />
                <Picker.Item label="2009" value="2009" />
                <Picker.Item label="2008" value="2008" />
                <Picker.Item label="2007" value="2007" />
                <Picker.Item label="2006" value="2006" />
                <Picker.Item label="2005" value="2005" />
                <Picker.Item label="2004" value="2004" />
                <Picker.Item label="2003" value="2003" />
                <Picker.Item label="2002" value="2002" />
                <Picker.Item label="2001" value="2001" />
                <Picker.Item label="2000" value="2000" />
                <Picker.Item label="1999" value="1999" />
                <Picker.Item label="1998" value="1998" />
                <Picker.Item label="1997" value="1997" />
                <Picker.Item label="1996" value="1996" />
                <Picker.Item label="1995" value="1995" />
                <Picker.Item label="1994" value="1994" />
                <Picker.Item label="1993" value="1993" />
                <Picker.Item label="1992" value="1992" />
                <Picker.Item label="1991" value="1991" />
                <Picker.Item label="1990" value="1990" />
                <Picker.Item label="1989" value="1989" />
                <Picker.Item label="1988" value="1988" />
                <Picker.Item label="1987" value="1987" />
                <Picker.Item label="1986" value="1986" />
                <Picker.Item label="1985" value="1985" />
                <Picker.Item label="1984" value="1984" />
                <Picker.Item label="1983" value="1983" />
                <Picker.Item label="1982" value="1982" />
                <Picker.Item label="1981" value="1981" />
                <Picker.Item label="1980" value="1980" />
                <Picker.Item label="1979" value="1979" />
                <Picker.Item label="1978" value="1978" />
                <Picker.Item label="1977" value="1977" />
                <Picker.Item label="1976" value="1976" />
                <Picker.Item label="1975" value="1975" />
                <Picker.Item label="1974" value="1974" />
                <Picker.Item label="1973" value="1973" />
                <Picker.Item label="1972" value="1972" />
            </Picker>
          </View>
          <View style={styles.selectBox} >
            <Picker
                onValueChange={year => setYearHigher(year)}
                selectedValue={yearHigher}
                >
                <Picker.Item label="Year to" value="2100" />
                <Picker.Item label="2022" value="2022" />
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2020" value="2020" />
                <Picker.Item label="2019" value="2019" />
                <Picker.Item label="2018" value="2018" />
                <Picker.Item label="2017" value="2017" />
                <Picker.Item label="2016" value="2016" />
                <Picker.Item label="2015" value="2015" />
                <Picker.Item label="2014" value="2014" />
                <Picker.Item label="2013" value="2013" />
                <Picker.Item label="2012" value="2012" />
                <Picker.Item label="2011" value="2011" />
                <Picker.Item label="2010" value="2010" />
                <Picker.Item label="2009" value="2009" />
                <Picker.Item label="2008" value="2008" />
                <Picker.Item label="2007" value="2007" />
                <Picker.Item label="2006" value="2006" />
                <Picker.Item label="2005" value="2005" />
                <Picker.Item label="2004" value="2004" />
                <Picker.Item label="2003" value="2003" />
                <Picker.Item label="2002" value="2002" />
                <Picker.Item label="2001" value="2001" />
                <Picker.Item label="2000" value="2000" />
                <Picker.Item label="1999" value="1999" />
                <Picker.Item label="1998" value="1998" />
                <Picker.Item label="1997" value="1997" />
                <Picker.Item label="1996" value="1996" />
                <Picker.Item label="1995" value="1995" />
                <Picker.Item label="1994" value="1994" />
                <Picker.Item label="1993" value="1993" />
                <Picker.Item label="1992" value="1992" />
                <Picker.Item label="1991" value="1991" />
                <Picker.Item label="1990" value="1990" />
                <Picker.Item label="1989" value="1989" />
                <Picker.Item label="1988" value="1988" />
                <Picker.Item label="1987" value="1987" />
                <Picker.Item label="1986" value="1986" />
                <Picker.Item label="1985" value="1985" />
                <Picker.Item label="1984" value="1984" />
                <Picker.Item label="1983" value="1983" />
                <Picker.Item label="1982" value="1982" />
                <Picker.Item label="1981" value="1981" />
                <Picker.Item label="1980" value="1980" />
                <Picker.Item label="1979" value="1979" />
                <Picker.Item label="1978" value="1978" />
                <Picker.Item label="1977" value="1977" />
                <Picker.Item label="1976" value="1976" />
                <Picker.Item label="1975" value="1975" />
                <Picker.Item label="1974" value="1974" />
                <Picker.Item label="1973" value="1973" />
                <Picker.Item label="1972" value="1972" />
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
          var year = parseInt(classified.Year);
          if (search) {
            if (classified.Model.toLowerCase().includes(search.toLowerCase()) || classified.Vehicle_Manufacturer.toLowerCase().includes(search.toLowerCase())) {
              if (price > parseInt(priceLower) && price < parseInt(priceHigher)) {
                if (year > parseInt(yearLower) && year < parseInt(yearHigher) || year == parseInt(yearLower) || year == parseInt(yearHigher)) {
                  return <CustomClassified style={{flexWrap: 'wrap'}} key={classified?._id} navigation={navigation} data={classified} edit={userInfo.username === classified.Username ? true : false } />
                }
              } 
            }
          } else {
            if (price > parseInt(priceLower) && price < parseInt(priceHigher)) {
              if (year > parseInt(yearLower) && year < parseInt(yearHigher) || year == parseInt(yearLower) || year == parseInt(yearHigher)) {
                return <CustomClassified style={{flexWrap: 'wrap'}} key={classified?._id} navigation={navigation} data={classified} edit={userInfo.username === classified.Username ? true : false } />
              }
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