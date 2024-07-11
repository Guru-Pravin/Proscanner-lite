import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DetailsScreenOne'); // Change 'Home' to the name of the screen you want to navigate to
    }, 2000);
    
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Prologo.png')} style={styles.logo} />
      <Text style={styles.title}>Pro Scanner Lite</Text>
      <Text style={styles.subtitle}>Digitalize your Docs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 121,
    height: 114,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight:'700',
    color:'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight:'400',
    color:'black',
  },
});

export default HomeScreen;
