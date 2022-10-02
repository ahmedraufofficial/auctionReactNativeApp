import * as React from 'react';
import { Modal, StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../../assets/images/thumbnail_Logo.png';

const CustomCarousel = ({images}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState(false);

  const _renderItem = ({item}) => {
    return (
      <View style={{
        borderRadius: 5,
        height: 250,
        marginRight: 15,
        }}
        >
          <Image source={{uri: `http://142.93.231.219/images/${item}`}} style={{width: "100%", height: "100%", position: "relative"}}/>
          <Image source={Logo} style={{position: 'absolute', width: 40, height: 40, right: 0}} resizeMode="contain" />
          <Button onPress={() => (setModalVisible(true), setUrl(`http://142.93.231.219/images/${item}`))} style={{position: 'absolute'}}><Ionicons name={'expand'} color={'white'} size={40} /></Button>
      </View>
    )
  }

  return (
    <>
    {images?.length > 0 ? 
      <View style={{flex: 1, paddingTop: 50, }}>
          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
              <Carousel
                layout={"default"}
                data={images}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem} />
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Image source={{uri: url ? url : ''}} style={{width: 345, height: 350, position: 'relative'}}/>
                  <Image source={Logo} style={{position: 'absolute', width: 40, height: 40, right: 0}} resizeMode="contain" />
                  <Button onPress={() => setModalVisible(!modalVisible)} style={{position: 'absolute', left: 0}}>
                    <Ionicons name={'close'} color={'white'} size={40} />
                  </Button>
                </View>
              </View>
            </Modal>
        </View>
      </View>
    : null}
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});


export default CustomCarousel;