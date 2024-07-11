import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import reactNativeHTMLToPdf from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

export default function Convertion({ route, navigation }) {
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
  const { imageUri } = route.params;

  const generatePdf = async () => {
    const options = {
      html: `<html>
          <head>
            <style>
              body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
                overflow: hidden;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                image-rendering: optimizeQuality;
                -ms-interpolation-mode: bicubic;
              }
            </style>
          </head>
          <body>
            <img src='${imageUri}'/>
          </body>
        </html>`,
      fileName: `${timestamp}`,
      directory: 'Documents',
    };

    try {
      const file = await reactNativeHTMLToPdf.convert(options);
      console.log(file);

      // Now download the generated PDF file
      const destPath = `${RNFS.DownloadDirectoryPath}/${timestamp}.pdf`;

      try {
        await RNFS.copyFile(file.filePath, destPath);
        Alert.alert('Download Success', `File saved to ${destPath}`);
      } catch (error) {
        Alert.alert('Download Error', error.message);
      }

      navigation.navigate('PdfViewer', { pdfPath: file.filePath });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Click to Generate Pdf
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.galleryButton} onPress={generatePdf}>
          <Text style={styles.buttonText2}>Generate Pdf</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'black',
    marginVertical: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    marginHorizontal: 40,
  },
  galleryButton: {
    marginTop: 30,
    width: 250,
    height: 47,
    backgroundColor: '#9F149F',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText2: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
});
