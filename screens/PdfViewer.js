import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';

const PdfViewer = ({ route }) => {
  const { pdfPath } = route.params;
  const source = { uri: `file://${pdfPath}` };
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('CameraScreen', { reset: true, retake: true });
  };

  const handleShare = async () => {
    try {
      await Share.open({
        url: `file://${pdfPath}`,
        type: 'application/pdf',
      });
    } catch (error) {
      console.log('Error sharing the PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.buttoncontainer}>
      <TouchableOpacity onPress={handleBack}>
        <View style={styles.backButton}>
          <Image source={require('../assets/icons/arrow-left.png')} style={styles.icon} />
          <Text style={{color:'black',fontSize:16}}>Back</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShare}>
        <View style={styles.shareButton}>
          <Image source={require('../assets/icons/share.png')} style={styles.shareicon} />
          <Text style={{color:'white',fontSize:16}}>Share</Text>
        </View>
      </TouchableOpacity>
      </View>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  buttoncontainer:{
    flex:0,
    flexDirection: 'row',
    justifyContent:'center',
    
    
  },
  backButton: {
    width:100,
    height:35,
    justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 180,
    backgroundColor:'#FFB2FF',
    borderRadius:20,
  },
  shareButton: {
    width:100,
    height:35,
    justifyContent:'center',
    backgroundColor:'#9F149F',
    borderRadius:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  shareicon:{
    width: 24,
    height: 24,
    marginRight: 5,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfViewer;
