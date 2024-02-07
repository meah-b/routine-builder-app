import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import SkillLibrary from './app/screens/SkillsLibrary';
import ConnectionLibrary from './app/screens/ConnectionLibrary';  
import RoutineLibrary from './app/screens/RoutineLibrary';
import RoutineBuilder from './app/screens/RoutineBuilder';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Skill Library' component={SkillLibrary} />
        <Stack.Screen name='Connection Library' component={ConnectionLibrary} />
        <Stack.Screen name='Routine Library' component={RoutineLibrary} />
        <Stack.Screen name='Routine Builder' component={RoutineBuilder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;