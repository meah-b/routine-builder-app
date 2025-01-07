import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firebase_auth, firestore_db } from './app/Firebase/firebaseConfig';

import { AppProvider } from './app/config/context';
import AthleteExport from './app/screens/AthleteExport';
import CoachExport from './app/screens/CoachExport';
import ConnectionLibrary from './app/screens/ConnectionLibrary';
import FeedbackForm from './app/screens/FeedbackForm';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import Menu from './app/screens/Menu';
import Profile from './app/screens/Profile';
import RosterScreen from './app/screens/RosterScreen';
import RoutineBuilder from './app/screens/RoutineBuilder';
import RoutineLibrary from './app/screens/RoutineLibrary';
import SignUpScreen from './app/screens/SignUpScreen';
import SkillLibrary from './app/screens/SkillsLibrary';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function AthleteLayout() {
	return (
		<InsideStack.Navigator screenOptions={{ headerShown: false }}>
			<InsideStack.Screen
				name='Home'
				component={HomeScreen}
			/>
			<InsideStack.Screen
				name='SkillLibrary'
				component={SkillLibrary}
			/>
			<InsideStack.Screen
				name='ConnectionLibrary'
				component={ConnectionLibrary}
			/>
			<InsideStack.Screen
				name='RoutineLibrary'
				component={RoutineLibrary}
			/>
			<InsideStack.Screen
				name='RoutineBuilder'
				component={RoutineBuilder}
			/>
			<InsideStack.Screen
				name='Profile'
				component={Profile}
			/>
			<InsideStack.Screen
				name='Menu'
				component={Menu}
			/>
			<InsideStack.Screen
				name='Feedback'
				component={FeedbackForm}
			/>
			<InsideStack.Screen
				name='Export'
				component={AthleteExport}
			/>
		</InsideStack.Navigator>
	);
}

function CoachLayout() {
	return (
		<InsideStack.Navigator screenOptions={{ headerShown: false }}>
			<InsideStack.Screen
				name='Roster'
				component={RosterScreen}
			/>
			<InsideStack.Screen
				name='Home'
				component={HomeScreen}
			/>
			<InsideStack.Screen
				name='SkillLibrary'
				component={SkillLibrary}
			/>
			<InsideStack.Screen
				name='ConnectionLibrary'
				component={ConnectionLibrary}
			/>
			<InsideStack.Screen
				name='RoutineLibrary'
				component={RoutineLibrary}
			/>
			<InsideStack.Screen
				name='RoutineBuilder'
				component={RoutineBuilder}
			/>
			<InsideStack.Screen
				name='Profile'
				component={Profile}
			/>
			<InsideStack.Screen
				name='Menu'
				component={Menu}
			/>
			<InsideStack.Screen
				name='Feedback'
				component={FeedbackForm}
			/>
			<InsideStack.Screen
				name='Export'
				component={CoachExport}
			/>
		</InsideStack.Navigator>
	);
}

export default function App() {
	const [user, setUser] = useState<User | null>(null);
	const [userType, setUserType] = useState('Athlete');

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebase_auth, (user) => {
			if (user != null) {
				setUser(user);
				const user_uid = user.uid;
				const user_doc = doc(firestore_db, 'users', user_uid);
				getDoc(user_doc).then((docSnapshot) => {
					if (docSnapshot.exists()) {
						setUserType(docSnapshot.data().account_type);
					}
				});
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, [firebase_auth]);

	return (
		<AppProvider>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='Login'
					screenOptions={{ headerShown: false }}>
					{user ? (
						userType === 'Athlete' ? (
							<Stack.Screen
								name='Athlete'
								component={AthleteLayout}
							/>
						) : (
							<Stack.Screen
								name='Coach'
								component={CoachLayout}
							/>
						)
					) : (
						<>
							<Stack.Screen
								name='Login'
								component={LoginScreen}
							/>
							<Stack.Screen
								name='SignUp'
								component={SignUpScreen}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AppProvider>
	);
}
