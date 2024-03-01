import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from './app/Firebase/firebaseConfig';

import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import SkillLibrary from './app/screens/SkillsLibrary';
import ConnectionLibrary from './app/screens/ConnectionLibrary';  
import RoutineLibrary from './app/screens/RoutineLibrary';
import RoutineBuilder from './app/screens/RoutineBuilder';
import Profile from './app/screens/Profile';
import NotifScreen from './app/screens/NotificationScreen';


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name='Home' component={HomeScreen} />
      <InsideStack.Screen name='Skill Library' component={SkillLibrary} />
      <InsideStack.Screen name='Connection Library' component={ConnectionLibrary} />
      <InsideStack.Screen name='Routine Library' component={RoutineLibrary} />
      <InsideStack.Screen name='Routine Builder' component={RoutineBuilder} />
      <InsideStack.Screen name='Profile' component={Profile} />
      <InsideStack.Screen name='Notif Screen' component={NotifScreen} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user)
    })
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} />
        ) : (
          <Stack.Screen name='Login' component={LoginScreen} />
        )}        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
