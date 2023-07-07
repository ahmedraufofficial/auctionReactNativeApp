import React, {useContext, useState} from 'react'
import { Button, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import Theme from '../../components/Theme';
import { AuthContext } from '../../Context/AuthContext';
import Checkbox from './Checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import {Text} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import SquareImageIcons from '../../components/SquareImageIcons/SquareImageIcons';
import { useEffect } from 'react';

const AddClassifieds = ({route, navigation}) => {
    const {userInfo} = useContext(AuthContext);
    const [images, setImages] = useState(null);
    const [ABS, setABS] = useState(false)
    const [Air_Bags, setAir_Bags] = useState(false)
    const [Air_Conditions, setAir_Conditions] = useState(false)
    const [Alloy_Rims, setAlloy_Rims] = useState(false)
    const [AM_FM_Radio, setAM_FM_Radio] = useState(false)
    const [Brake_Assit, setBrake_Assit] = useState(false)
    const [Central_Locking, setCentral_Locking] = useState(false)        
    const [Cruise_Control, setCruise_Control] = useState(false)
    const [Immobilizer_Key, setImmobilizer_Key] = useState(false)        
    const [Power_Steering, setPower_Steering] = useState(false)
    const [Power_Windows, setPower_Windows] = useState(false)
    const [Rear_Parking_Sensor, setRear_Parking_Sensor] = useState(false)
    const [Steering_Adjustment, setSteering_Adjustment] = useState(false)
    const [Xenon_Headlights, setXenon_Headlights] = useState(false)   

    /* const upload = (x) => {
        const formData = new FormData();
        const files = x
        for(let i=0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        fetch(`https://backend.carologyauctions.net/upload_classified_images`, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            }).then((res) => res.json())
            .then(json => (setImages(json.message?.Images, Alert.alert('Succesfully uploaded'))))
            .catch((err) => ("Error occured", err));
    } */

    const [preImages, setPreImages] = useState([]);

    const upload = (x) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          const files = x;
          for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
          }
      
          fetch(`https://backend.carologyauctions.net/upload_classified_images`, {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data'
            }
          })
            .then((res) => res.json())
            .then((json) => {
              console.log('Success');
              resolve(json.message?.Images);
            })
            .catch((err) => {
              console.error('Error occurred', err);
              reject(err);
            });
        });
      };
    

    const openImagePicker = () => {
        let imageList = [];

        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.2,
            maxFiles: 10,
            mediaType: 'any',
            includeBase64: true,
            width: 300,
            height: 400,
            cropping: true
        }).then(async response => {
            const images = response.map((image) =>({
                uri: image.path,
                type: image.mime,
                name: image.path.split('/')[image.path.split('/').length - 1]
            }))
            setPreImages(images)
        })
    }

    const [vehicles, setVehicles] = useState([])

    const [Model_Names, setModel_Names] = useState([]);
  
  
    const url = 'https://car-data.p.rapidapi.com/cars/makes';
  
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'bc0999e258mshcf4317dd12e51e3p170dc4jsn618b97c551a7',
          'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
        }
      };
      
  
      const fetchData = () => {
          fetch(url, options)
          .then(res => res.json())
          .then(json => setVehicles(json))
          .catch(err => console.error('error:' + err));
      }
  
      const getModels = async (x) => {
          const modelsRequest = await fetch(`https://car-api2.p.rapidapi.com/api/models?make=${x}&sort=id&direction=asc&year=2020&verbose=yes`, {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'bc0999e258mshcf4317dd12e51e3p170dc4jsn618b97c551a7',
              'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
            }
          })
          const modelsJson = await modelsRequest.json()
          const modelsArray = modelsJson.data
          if (x == "Nissan") {
            modelsArray.push({name: "Patrol"})
          }
          setModel_Names(modelsArray.map((x) => {
            return x.name
          }))
        }
  
  
      function handleChange2(e) {
          getModels(e);
      }

    useEffect(()=>{
        fetchData();
    },[])
    

  return (
    <ScrollView style={styles.root}>
        <Formik
            initialValues={{ }}
            onSubmit={async values => {
                const images = await upload(preImages)
                values.Username = userInfo.username;
                values.Images = images;
                values.Added_Date = new Date().toISOString().slice(0, 10)
                values.Features = [
                    {"ABS": ABS},
                    {"Air Bags": Air_Bags},
                    {"Air Conditions": Air_Conditions},
                    {"Alloy Rims": Alloy_Rims},
                    {"AM/FM Radio": AM_FM_Radio},
                    {"Brake Assit": Brake_Assit},
                    {"Central Locking": Central_Locking},
                    {"Cruise Control": Cruise_Control},
                    {"Immobilizer Key": Immobilizer_Key},
                    {"Power Steering": Power_Steering},
                    {"Power Windows": Power_Windows},
                    {"Rear Parking Sensor": Rear_Parking_Sensor},
                    {"Steering Adjustment": Steering_Adjustment},
                    {"Xenon Headlights": Xenon_Headlights}
                ]
                const response = await fetch(`https://backend.carologyauctions.net/add/classifieds`, {
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
                            "Successfully Added",
                            ' ',
                            [
                              {
                                text: "OK",
                                onPress: () => {navigation.navigate('Classifieds')},
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
                    ADD CLASSIFIEDS
                </Text>
                {/* <TouchableOpacity style={{backgroundColor: Theme.colors.primary, marginTop: 10, padding: 10}} onPress={openImagePicker}>
                    <Text>UPLOAD IMAGE</Text>
                </TouchableOpacity> */}
            {      
              <TouchableOpacity style={{backgroundColor: Theme.colors.primary, marginTop: 10, padding: 10}} onPress={openImagePicker}>
                <Text>UPLOAD IMAGE</Text>
              </TouchableOpacity>
              }
              {
                preImages.length > 0 ? <View>
                  <SquareImageIcons images={preImages} />
                </View> : <></>
              }


                {/* <TextInput onChangeText={handleChange('Vehicle_Manufacturer')} onBlur={handleBlur('Vehicle_Manufacturer')} value={values.Vehicle_Manufacturer} label='Vehicle Manufacturer' style={styles.inputText} />
                <TextInput onChangeText={handleChange('Model')} onBlur={handleBlur('Model')} value={values.Model} label='Model' style={styles.inputText} /> */}
                
                <Text style={styles.selectHeader}>Vehicle Manufacturer</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={(itemValue) => {
                      handleChange2(itemValue);
                      handleChange('Vehicle_Manufacturer')(itemValue);
                    }}
                    selectedValue={values.Vehicle_Manufacturer}
                    >
                    <Picker.Item label="Manufacturer" value="0" />
                      {vehicles.length > 0 && (
                          vehicles.map((vehicle, index) => (
                              <Picker.Item key={index+vehicle} label={vehicle} value={vehicle} />
                          ))
                      )}  
                </Picker>
              </View>

              <Text style={styles.selectHeader}>Model</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={(itemValue) => {
                      handleChange('Model')(itemValue);
                    }}
                    selectedValue={values.Model}
                    >
                    <Picker.Item label="Model" value="0" />
                      {Model_Names.length > 0 && (
                          Model_Names.map((model, index) => (
                              <Picker.Item key={index+model} label={model} value={model} />
                          ))
                      )}  
                </Picker>
              </View>


              <Text style={styles.selectHeader}>Year</Text>
              <View style={styles.selectBox}>
                <Picker
                  enabled={true}
                  onValueChange={(itemValue) => {
                    handleChange('Year')(itemValue);
                  }}
                  selectedValue={values.Year}
                >
                  <Picker.Item label="Year" value="0" />
                  {Array.from({ length: 35 }, (_, index) => {
                    const year = parseInt(new Date().getFullYear()) + 1 - index;
                    return <Picker.Item key={year} label={year.toString()} value={year.toString()} />;
                  })}
                </Picker>
              </View>

              <Text style={styles.selectHeader}>Engine Size</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Engine')}
                    selectedValue={values.Engine}
                    >
                    <Picker.Item label="Litres" value="0" />
                    <Picker.Item label="1.0L" value="1.0L" />
                    <Picker.Item label="1.2L" value="1.2L" />
                    <Picker.Item label="1.5L" value="1.5L" />
                    <Picker.Item label="1.8L" value="1.8L" />
                    <Picker.Item label="2.0L" value="2.0L" />
                    <Picker.Item label="2.5L" value="2.5L" />
                    <Picker.Item label="3.0L" value="3.0L" />
                    <Picker.Item label="3.5L" value="3.5L" />
                    <Picker.Item label="4.0L" value="4.0L" />
                    <Picker.Item label="> 4.5L" value="> 4.5L" />
                </Picker>
              </View>

                
                {/* <TextInput onChangeText={handleChange('Year')} onBlur={handleBlur('Year')} value={values.Year} label='Year' style={styles.inputText} />
                <TextInput onChangeText={handleChange('Engine')} onBlur={handleBlur('Engine')} value={values.Engine} label='Engine' style={styles.inputText} /> */}
                
                
                <TextInput onChangeText={handleChange('Product_Description')} onBlur={handleBlur('Product_Description')} value={values.Product_Description} label='Product Description' style={styles.inputText} />
                <TextInput onChangeText={handleChange('Price')} onBlur={handleBlur('Price')} value={values.Price} label='Price (AED)' style={styles.inputText} />
                
                <Text style={[styles.selectHeader, {marginBottom: 10}]}>Features</Text>
                <Checkbox value={ABS} setValue={setABS} placeholder={"ABS"}/>
                <Checkbox value={Air_Bags} setValue={setAir_Bags} placeholder={"Air Bags"}/>
                <Checkbox value={Air_Conditions} setValue={setAir_Conditions} placeholder={"Air Conditions"}/>
                <Checkbox value={Alloy_Rims} setValue={setAlloy_Rims} placeholder={"Alloy Rims"}/>
                <Checkbox value={AM_FM_Radio} setValue={setAM_FM_Radio} placeholder={"AM/FM Radio"}/>
                <Checkbox value={Brake_Assit} setValue={setBrake_Assit} placeholder={"Brake Assit"}/>
                <Checkbox value={Central_Locking} setValue={setCentral_Locking} placeholder={"Central Locking"}/>
                <Checkbox value={Cruise_Control} setValue={setCruise_Control} placeholder={"Cruise Control"}/>
                <Checkbox value={Immobilizer_Key} setValue={setImmobilizer_Key} placeholder={"Immobilizer Key"}/>
                <Checkbox value={Power_Steering} setValue={setPower_Steering} placeholder={"Power Steering"}/>
                <Checkbox value={Power_Windows} setValue={setPower_Windows} placeholder={"Power Windows"}/>
                <Checkbox value={Rear_Parking_Sensor} setValue={setRear_Parking_Sensor} placeholder={"Rear Parking Sensor"}/> 
                <Checkbox value={Steering_Adjustment} setValue={setSteering_Adjustment} placeholder={"Steering Adjustment"}/> 
                <Checkbox value={Xenon_Headlights} setValue={setXenon_Headlights} placeholder={"Xenon Headlights"}/>
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
                
                <Text style={styles.selectHeader}>Condition</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Condition')}
                    selectedValue={values.Condition}
                    >
                    <Picker.Item label="Excellent" value="Excellent" />
                    <Picker.Item label="Good" value="Good" />
                    <Picker.Item label="Average" value="Average" />
                    <Picker.Item label="Poor" value="Poor" />
                </Picker>
              </View>

                <TextInput onChangeText={handleChange('Exterior_Color')} onBlur={handleBlur('Exterior_Color')} value={values.Exterior_Color} label='Exterior Color' style={styles.inputText} />
                <TextInput onChangeText={handleChange('Kilometers')} onBlur={handleBlur('Kilometers')} value={values.Kilometers} label='Kilometers' style={styles.inputText} />
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
                        <Picker.Item label="Pickup" value="Pickup" />
                        <Picker.Item label="Truck" value="Truck" />
                        <Picker.Item label="Crossover" value="Crossover" />
                        <Picker.Item label="Soft Top Convertible" value="Soft Top Convertible" />
                        <Picker.Item label="Hard Top Convertible" value="Hard Top Convertible" />
                        <Picker.Item label="Commercial Van" value="Commercial Van" />
                        <Picker.Item label="Minivan" value="Minivan" />
                    </Picker>
                </View>
               
                <Text style={styles.selectHeader}>Transmission</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Transmission')}
                    selectedValue={values.Transmission}
                    >
                    <Picker.Item label="Automatic" value="Automatic" />
                    <Picker.Item label="Manual" value="Manual" />
                    <Picker.Item label="CVT" value="CVT" />
                    <Picker.Item label="Electric" value="Electric" />
                </Picker>
              </View>

              {/* <TextInput onChangeText={handleChange('Transmission')} onBlur={handleBlur('Transmission')} value={values.Transmission} label='Transmission' style={styles.inputText} />    */}

              <Text style={styles.selectHeader}>Fuel Type</Text>
              <View style={styles.selectBox}>
                <Picker
                    enabled={true} 
                    onValueChange={handleChange('Fuel_Type')}
                    selectedValue={values.Fuel_Type}
                    >
                    <Picker.Item label="Petrol" value="Petrol" />
                    <Picker.Item label="Hybrid" value="Hybrid" />
                    <Picker.Item label="Electric" value="Electric" />
                    <Picker.Item label="Diesel" value="Diesel" />
                </Picker>
              </View>

                
                <TextInput onChangeText={handleChange('Interior_Color')} onBlur={handleBlur('Interior_Color')} value={values.Interior_Color} label='Interior Color' style={styles.inputText} />
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
                <TextInput onChangeText={handleChange('Seller_Name')} onBlur={handleBlur('Seller_Name')} value={values.Seller_Name} label='Seller Name' style={styles.inputText} />
                <TextInput onChangeText={handleChange('Seller_Contact')} onBlur={handleBlur('Seller_Contact')} value={values.Seller_Contact} label='Seller Contact' style={styles.inputText} />
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
        marginBottom: 10, borderColor: Theme.colors.primary, borderWidth: 1, width: '100%', overflow: 'hidden', height: 60, flex: 1, justifyContent: 'center' 
      },
    selectHeader: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16
    }
});

export default AddClassifieds