import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';

const SquareImageIcons = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      {images.map((image, index) => (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleImagePress(image)}
          key={index}
        >
          <Image source={{ uri: image.uri }} style={styles.icon} />
        </TouchableOpacity>
      ))}

      {/* Modal to display enlarged image */}
      <Modal visible={selectedImage !== null} onRequestClose={closeModal} transparent>
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
          <Image source={{ uri: selectedImage?.uri }} style={styles.enlargedIcon} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const iconSize = 50;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    borderRadius: 10,
    marginHorizontal: 5,
    overflow: 'hidden',
    marginBottom: 10
  },
  icon: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  enlargedIcon: {
    width: windowWidth - 40,
    height: windowWidth - 40,
    resizeMode: 'contain',
  },
});

export default SquareImageIcons;