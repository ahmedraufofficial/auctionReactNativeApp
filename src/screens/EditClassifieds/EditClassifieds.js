import React, {useContext, useState, useEffect} from 'react'
import { Button, View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import Theme from '../../components/Theme';
import { AuthContext } from '../../Context/AuthContext';
import Checkbox from '../AddClassifieds/Checkbox';
import ImagePicker from 'react-native-image-crop-picker';
import {Text} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import SquareImageIconsEdit from '../../components/SquareImageIconsEdit/SquareImageIconsEdit';
import SquareImageIcons from '../../components/SquareImageIcons/SquareImageIcons';

const EditClassifieds = ({route, navigation}) => {

    const [classified, setClassifieds] = useState()
    const [preImages, setPreImages] = useState([]);
    const [newImages, setNewImages] = useState([])

    const getClassified = async () => {
      fetch(`https://backend.carologyauctions.net/classifieds/${route.params.id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        var res = data.response
        delete res.Features
        setPreImages(res.Images)
        delete res.Images
        setClassifieds(res)
        const isJapaneseOrKorean = data.response.Specs  === "Japanese" || data.response.Specs  === "Korean" || data.response.Specs  === "GCC";
        isJapaneseOrKorean ? setMileage(true) : setMileage(false)
      })
    }

      useEffect(()=>{
        getClassified();
      }, [])

    const {userInfo} = useContext(AuthContext);
    //const [images, setImages] = useState(null);
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
    const [mileage, setMileage] = useState(true)   

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
            //upload(images);
            setPreImages([])
            setNewImages(images);
        }).catch((err) => ("Error occured", err));
    }


  return (
    <ScrollView style={styles.root}>
        {
            !classified ? <></> :
        <Formik
            initialValues={classified}
            onSubmit={async values => {
                values.Username = userInfo.username;
                values.Added_Date = new Date().toISOString().slice(0, 10);
                if (newImages.length > 0) {
                    const images = await upload(newImages)
                    values.Images = images;
                }
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
                const response = await fetch(`https://backend.carologyauctions.net/edit/classifieds/${route.params.id}`, {
                    method: 'PUT',
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
                            "Successfully Edited",
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
                <TouchableOpacity style={{backgroundColor: Theme.colors.primary, marginTop: 10, padding: 10}} onPress={openImagePicker}>
                    <Text>UPLOAD IMAGE</Text>
                </TouchableOpacity>

                {
                preImages.length > 0 ? <View>
                  <SquareImageIconsEdit images={preImages} />
                </View> : <></>
              }

            {   newImages.length > 0 ? <View>
                  <SquareImageIcons images={newImages} />
                </View> : <></>
              }

                <TextInput onChangeText={handleChange('Vehicle_Manufacturer')} onBlur={handleBlur('Vehicle_Manufacturer')} value={values.Vehicle_Manufacturer} label='Vehicle Manufacturer' style={styles.inputText} />
                <TextInput onChangeText={handleChange('Model')} onBlur={handleBlur('Model')} value={values.Model} label='Model' style={styles.inputText} />

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

                
              <TextInput autoCapitalize="sentences" onChangeText={handleChange('Product_Description')} onBlur={handleBlur('Product_Description')} value={values.Product_Description} label='Product Description' style={styles.inputText}
                 multiline
                 numberOfLines={7} 
                />
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
                        onValueChange={(itemValue) => {
                            handleChange('Specs')(itemValue);
                            const isJapaneseOrKorean = itemValue === "Japanese" || itemValue === "Korean" || itemValue === "GCC";
                            isJapaneseOrKorean ? setMileage(true) : setMileage(false)
                          }
                        }
                        selectedValue={values.Specs}
                        >
                        <Picker.Item label="GCC" value="GCC" />
                        <Picker.Item label="American" value="American" />
                        <Picker.Item label="European" value="European" />
                        <Picker.Item label="Canadian" value="Canadian" />
                        <Picker.Item label="Japanese" value="Japanese" />
                        <Picker.Item label="Korean" value="Korean" />
                    </Picker>
                </View>

                {mileage ? <View style={styles.inputContainer}>
                  <TextInput
                    onChangeText={handleChange('Kilometers')}
                    onBlur={handleBlur('Kilometers')}
                    value={values.Kilometers}
                    label="Kilometers"
                    keyboardType="numeric"
                    style={styles.inputText2}
                  />
                  <Text style={styles.kmLabel}>KM</Text>
                  </View> : 
                  <View style={styles.inputContainer}>
                    <TextInput
                      onChangeText={handleChange('Kilometers')}
                      onBlur={handleBlur('Kilometers')}
                      value={values.Kilometers}
                      label="Miles"
                      keyboardType="numeric"
                      style={styles.inputText}
                    />
                    <Text style={styles.kmLabel}>Miles</Text>
                  </View>
                }


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
        }
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
    },
    inputContainer: {
      flexDirection: 'row', // Display elements in a row
      alignItems: 'center',
      justifyContent:'space-between' // Vertically center align elements
    },
    kmLabel: {
      marginLeft: 10, // Add some spacing between input and label
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      marginTop: 5,
    },inputText2: {
      borderWidth: 1, 
      borderColor: Theme.colors.primary, 
      color: 'white', 
      marginVertical: 20,
      minWidth:'80%'
    },  
});

export default EditClassifieds