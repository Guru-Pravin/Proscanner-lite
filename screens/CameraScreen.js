import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.retake) {
      retakeImage();
    }
  }, [route.params]);

  const openLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      quality: 1, // Set quality to 1 for HD
    });
    if (result?.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setIsImageSelected(true);
    }
  };

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: false,
      quality: 1, // Set quality to 1 for HD
    });
    if (result?.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setIsImageSelected(true);
    }
  };

  const retakeImage = () => {
    setImageUri(null);
    setIsImageSelected(false);
  };

  const confirmImage = () => {
    console.log('Image confirmed:', imageUri);
    navigation.navigate('Convertion', { imageUri });
  };

  return (
    <View style={styles.container}>
      {isImageSelected ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakeImage}>
              <Text style={styles.buttonText1}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmImage}>
              <Text style={styles.buttonText2}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Scan Now ...</Text>
          <TouchableOpacity style={styles.openCameraButton} onPress={openCamera}>
            <Text style={styles.buttonText1}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.galleryButton} onPress={openLibrary}>
            <Text style={styles.buttonText2}>Choose from Gallery</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  image: {
    width: 400,
    height: 600,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  openCameraButton: {
    width: 157,
    marginTop: 30,
    height: 47,
    backgroundColor: '#9F149F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryButton: {
    marginTop: 30,
    width: 250,
    height: 47,
    backgroundColor: '#FFB2FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeButton: {
    width: 120,
    height: 47,
    backgroundColor: '#9F149F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    width: 120,
    height: 47,
    backgroundColor: '#FFB2FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  buttonText2: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});

export default CameraScreen;
