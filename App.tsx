/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BreedList } from './src/ui/screens/BreedList';
import { BreedDetail } from './src/ui/screens/BreedDetail';
import SplashScreen from 'react-native-splash-screen';
import { Breed } from './src/domain/breed';

type RootStackParamList = {
  Home: undefined;
  Detail: { breed: Breed };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={BreedList} />
          <Stack.Screen name="Detail" component={BreedDetail} options={({ route }) => ({ title: route.params.breed.name })} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
