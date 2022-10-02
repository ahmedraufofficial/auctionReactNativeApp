import React, {useContext, useState} from 'react'
import { Button, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import Theme from '../../components/Theme';
import { AuthContext } from '../../Context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import {Text} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { useEffect } from 'react';

const Evaluation = ({route, navigation}) => {
  const {userInfo} = useContext(AuthContext);
  const [images, setImages] = useState(null);
  const upload = (x) => {
    const formData = new FormData();
    const files = x
    for(let i=0; i < files.length; i++) {
        formData.append("files", files[i]);
    }

    fetch(`http://142.93.231.219/upload_classified_images`, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        }).then((res) => res.json())
        .then(json => (setImages(json.message?.Images, Alert.alert('Succesfully uploaded'))))
        .catch((err) => ("Error occured", err));
}

  const openImagePicker = () => {
      let imageList = [];

      ImagePicker.openPicker({
          multiple: true,
          waitAnimationEnd: false,
          includeExif: true,
          forceJpg: true,
          compressImageQuality: 0.8,
          maxFiles: 10,
          mediaType: 'any',
          includeBase64: true
      }).then(response => {
          const images = response.map((image) =>({
              uri: image.path,
              type: image.mime,
              name: image.path.split('/')[image.path.split('/').length - 1]
          }))
          upload(images);
      })
  }

/* const getCars = async () => {
    await fetch(`https://all-cars.p.rapidapi.com/cars`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bc0999e258mshcf4317dd12e51e3p170dc4jsn618b97c551a7',
            'X-RapidAPI-Host': 'all-cars.p.rapidapi.com'
        }
        }).then(res => res.json())
        .then(json => console.log(json))
        .catch((err) => ("Error occured", err));
}

useEffect(()=>{
    getCars();
},[]) */

return (
  <ScrollView style={styles.root}>
      <Formik
          initialValues={{ }}
          onSubmit={async values => {
              values.Username = userInfo.username;
              values.Images = images;
              values.Added_Date = new Date().toISOString().slice(0, 10)
              const response = await fetch(`http://142.93.231.219/add/evaluation`, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      values
                  })
              })
              const data = await response.json()
              if (data) {
                  if (data.status === '200')
                  {
                    Alert.alert(
                      "Successfully Sent",
                      ' ',
                      [
                        {
                          text: "OK",
                          onPress: () => {navigation.navigate('Middleware')},
                        }
                      ]
                  )
                  } else if (data.status === '500') 
                  {
                      console.log(data.error)
                  }
              }
          
          }}
      >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View styles={{marginBottom: 40}}>
              <Text>
                  ADD EVALUATION
              </Text>
              {
                images ? <Text>Uploaded</Text> :           
              <TouchableOpacity style={{backgroundColor: Theme.colors.primary, marginTop: 10, padding: 10}} onPress={openImagePicker}>
                <Text>UPLOAD IMAGE</Text>
              </TouchableOpacity>
              }

              <TextInput onChangeText={handleChange('Vehicle_Manufacturer')} onBlur={handleBlur('Vehicle_Manufacturer')} value={values.Vehicle_Manufacturer} label='Vehicle Manufacturer' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Model')} onBlur={handleBlur('Model')} value={values.Model} label='Model' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Year')} onBlur={handleBlur('Year')} value={values.Year} label='Year' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Meeting_Point')} onBlur={handleBlur('Meeting_Point')} value={values.Meeting_Point} label='Meeting Point' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Engine')} onBlur={handleBlur('Engine')} value={values.Engine} label='Engine' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Product_Description')} onBlur={handleBlur('Product_Description')} value={values.Product_Description} label='Product Description' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Price')} onBlur={handleBlur('Price')} value={values.Price} label='Price' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Currency')} onBlur={handleBlur('Currency')} value={values.Currency} label='Currency' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Seller_Dealer')} onBlur={handleBlur('Seller_Dealer')} value={values.Seller_Dealer} label='Seller Dealer' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Location')} onBlur={handleBlur('Location')} value={values.Location} label='Location' style={styles.inputText} />
              <TextInput onChangeText={handleChange('VIN')} onBlur={handleBlur('VIN')} value={values.VIN} label='VIN' style={styles.inputText} />
              
              <Text style={styles.selectHeader}>Availability</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Availability')}
                    selectedValue={values.Availability}
                    >
                    <Picker.Item label="Available" value="Available" />
                    <Picker.Item label="Available later" value="Available later" />
                    <Picker.Item label="Sold" value="Sold" />
                </Picker>
              </View>
              
              <Text style={styles.selectHeader}>Cylinders</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Cylinders')}
                    selectedValue={values.Cylinders}
                    >
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="8+" value="8+" />
                </Picker>
              </View>
              <TextInput onChangeText={handleChange('Condition')} onBlur={handleBlur('Condition')} value={values.Condition} label='Condition' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Exterior_Color')} onBlur={handleBlur('Exterior_Color')} value={values.Exterior_Color} label='Exterior Color' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Kilometers')} onBlur={handleBlur('Kilometers')} value={values.Kilometers} label='Kilometers' style={styles.inputText} />
              
              <Text style={styles.selectHeader}>Accident</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Accident')}
                    selectedValue={values.Accident}
                    >
                    <Picker.Item label="None" value="None" />
                    <Picker.Item label="Minor" value="Minor" />
                    <Picker.Item label="Major" value="Major" />
                </Picker>
              </View>
              
              
              <Text style={styles.selectHeader}>Body Style</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Body_Style')}
                    selectedValue={values.Body_Style}
                    >
                    <Picker.Item label="Sedan" value="Sedan" />
                    <Picker.Item label="Coupe" value="Coupe" />
                    <Picker.Item label="Sports Car" value="Sports Car" />
                    <Picker.Item label="Station Wagon" value="Station Wagon" />
                    <Picker.Item label="Hatchback" value="Hatchback" />
                    <Picker.Item label="Converitble" value="Convertible" />
                    <Picker.Item label="SUV" value="SUV" />
                    <Picker.Item label="Minivan" value="Minivan" />
                </Picker>
              </View>
              <TextInput onChangeText={handleChange('Transmission')} onBlur={handleBlur('Transmission')} value={values.Transmission} label='Transmission' style={styles.inputText} />   
              <TextInput onChangeText={handleChange('Fuel_Type')} onBlur={handleBlur('Fuel_Type')} value={values.Fuel_Type} label='Fuel Type' style={styles.inputText} />
              <TextInput onChangeText={handleChange('Interior_Color')} onBlur={handleBlur('Interior_Color')} value={values.Interior_Color} label='Interior Color' style={styles.inputText} />
              
              <Text style={styles.selectHeader}>Doors</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Doors')}
                    selectedValue={values.Doors}
                    >
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
              <TextInput onChangeText={handleChange('Registration_Area')} onBlur={handleBlur('Registration_Area')} value={values.Registration_Area} label='Registration Area' style={styles.inputText} />   
              
              <Text style={styles.selectHeader}>Paint Condition</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Paint_Condition')}
                    selectedValue={values.Paint_Condition}
                    >
                    <Picker.Item label="Good" value="Good" />
                    <Picker.Item label="Average" value="Average" />
                    <Picker.Item label="Damaged" value="Damaged" />
                </Picker>
              </View>
              <TextInput onChangeText={handleChange('Service_History')} onBlur={handleBlur('Service_History')} value={values.Service_History} label='Service History' style={styles.inputText} />   
              
              
              <Text style={styles.selectHeader}>Number Of Owners</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Number_Of_Owners')}
                    selectedValue={values.Number_Of_Owners}
                    >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="3+" value="3+" />
                </Picker>
              </View>
              
              <Text style={styles.selectHeader}>Fault Indication Sign</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Fault_Indication_Sign')}
                    selectedValue={values.Fault_Indication_Sign}
                    >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
              </View>
              
              <Text style={styles.selectHeader}>Number Of Keys</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Number_Of_Keys')}
                    selectedValue={values.Number_Of_Keys}
                    >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="3+" value="3+" />
                </Picker>
              </View>
              <Text style={styles.selectHeader}>Specs</Text>
                <View style={styles.selectBox}>
                    <Picker
                        enabled={true} 
                        onValueChange={handleChange('Specs')}
                        selectedValue={values.Specs}
                        >
                        <Picker.Item label="GCC" value="GCC" />
                        <Picker.Item label="American Specs" value="American Specs" />
                    </Picker>
                </View>
              <Text style={styles.selectHeader}>Log Book</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Log_Book')}
                    selectedValue={values.Log_Book}
                    >
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
              </View>
              
              <Button onPress={handleSubmit} title="Submit" />
              <View style={{height: 50}}>

              </View>
          </View>
          )}
      </Formik>
  </ScrollView>
)
}

const styles = StyleSheet.create({
  root: {
      paddingHorizontal: 15,
      paddingVertical: 15
  },
  inputText: {
    borderWidth: 1, 
    borderColor: Theme.colors.primary, 
    color: 'white', 
    marginVertical: 20
  },
  selectBox: {
    marginBottom: 10, borderColor: Theme.colors.primary, borderWidth: 1,  height: 60, padding: 0, 
  },
  selectHeader: {
    marginTop: 10,
    marginBottom: 5
  }
});

export default Evaluation