import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebase_auth, firestore_db } from './app/Firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import SkillLibrary from './app/screens/SkillsLibrary';
import ConnectionLibrary from './app/screens/ConnectionLibrary';  
import RoutineLibrary from './app/screens/RoutineLibrary';
import RoutineBuilder from './app/screens/RoutineBuilder';
import Profile from './app/screens/Profile';
import NotifScreen from './app/screens/NotificationScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import RosterScreen from './app/screens/RosterScreen';


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function AthleteLayout() {
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

function CoachLayout() {
  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name='Roster' component={RosterScreen} />
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
  const [userType, setUserType] = useState('');

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user)
      const user_uid = user.uid;
      const user_doc = doc(firestore_db, 'users', user_uid);
      getDoc(user_doc)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              setUserType(docSnapshot.data().account_type);
            }
          })
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {user ? (userType === 'Athlete' ? (
          <Stack.Screen name='Athlete' component={AthleteLayout} />
        ) : (
          <Stack.Screen name='Coach' component={CoachLayout} />
        )) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Sign Up' component={SignUpScreen} />
          </>
        )}        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
