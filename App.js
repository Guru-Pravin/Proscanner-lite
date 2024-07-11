import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

import HomeScreen from './screens/HomeScreen';
import DetailsScreenOne from './screens/DetailsScreenOne';
import DetailsScreenTwo from './screens/DetailsScreenTwo';
import DetailsScreenThree from './screens/DetailsScreenThree';
import CameraScreen from './screens/CameraScreen';
import Convertion from './screens/Convertion';
import PdfViewer from './screens/PdfViewer';

const Stack = createNativeStackNavigator();

const App = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const checkAndRequestPermissions = async () => {
    // Check and request camera permission
    const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);
    if (cameraPermission !== RESULTS.GRANTED) {
      const cameraRequest = await request(PERMISSIONS.ANDROID.CAMERA);
      if (cameraRequest !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'Camera permission is required to use this feature. Please enable it in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ]
        );
        return;
      }
    }

    // If all permissions are granted
    setPermissionsGranted(true);
    
  };

  useEffect(() => {
    if (!permissionsGranted) {
      checkAndRequestPermissions();
    }
  }, [permissionsGranted]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailsScreenOne" component={DetailsScreenOne} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsScreenTwo" component={DetailsScreenTwo} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsScreenThree" component={DetailsScreenThree} options={{ headerShown: false }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Convertion" component={Convertion} options={{ headerShown: false }} />
        <Stack.Screen name="PdfViewer" component={PdfViewer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
