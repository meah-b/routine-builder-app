import { LinearGradient } from 'expo-linear-gradient';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../assets/components/buttons/Buttons';
import EventButtons from '../assets/components/buttons/EventButtons';
import HomeButton from '../assets/components/buttons/HomeButton';
import LevelButtons from '../assets/components/buttons/LevelButtons';
import RoutineBuilderForm from '../assets/components/forms/RoutineBuilderForm';
import Header from '../assets/components/utilities/Header';
import { H1Logo } from '../assets/components/utilities/Logo';
import AppContext from '../config/context';
import { CustomText, colors } from '../config/theme';

type RootStackParamList = {
	RoutineLibrary: undefined;
};

interface RoutineBuilderProps {
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function RoutineBuilder({ navigation }: RoutineBuilderProps) {
	const [isBuilding, setIsBuilding] = useState(false);
	const [routineId, setRoutineId] = useState('');
	const [eventId, setEventId] = useState('');

	async function addBaseRoutine(name: string, event: string, level: string) {
		const { selectedAthlete } = React.useContext(AppContext);
		const user_uid = selectedAthlete
			? selectedAthlete
			: firebase_auth.currentUser.uid;
		const routineRef = collection(
			doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()),
			'routines'
		);
		try {
			await setDoc(
				doc(routineRef, name),
				{
					name: name,
					event: event,
					level: level,
				},
				{ merge: true }
			);
		} catch (error) {
			console.error('Error adding connection:', error);
		}
	}

	async function handleDelete(name: string, event: string) {
		const { selectedAthlete } = React.useContext(AppContext);
		const user_uid = selectedAthlete
			? selectedAthlete
			: firebase_auth.currentUser.uid;
		const routineRef = collection(
			doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()),
			'routines'
		);
		try {
			const docRef = doc(routineRef, name);
			await deleteDoc(docRef);
		} catch (error) {
			console.error('Error deleting document:', error);
		}
	}

	const startBuilding = (name: string, event: string, level: string) => {
		setIsBuilding(true);
		setRoutineId(name);
		setEventId(event);
		addBaseRoutine(name, event, level);
	};

	function RoutineSetUpForm() {
		const [name, setName] = useState('');
		const [event, setEvent] = useState('Bars');
		const [level, setLevel] = useState('');

		return (
			<View
				onTouchStart={() => Keyboard.dismiss()}
				style={styles.formContainer}>
				<CustomText
					style={[styles.text2, { marginBottom: 5 }]}
					bold>
					Routine Name:
				</CustomText>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						editable
						placeholder='Routine Name'
						placeholderTextColor={colors.grey200}
						maxLength={30}
						onChangeText={(text) => setName(text)}
						value={name}
					/>
				</View>
				<CustomText
					style={styles.text2}
					bold>
					Event:
				</CustomText>
				<View style={styles.eventButtons}>
					<EventButtons
						variant='build'
						selectedVariant={event}
						onPress1={() => {}}
						onPress2={() => setEvent('Bars')}
						onPress3={() => setEvent('Beam')}
						onPress4={() => setEvent('Floor')}
					/>
				</View>
				<CustomText
					style={styles.text2}
					bold>
					Level:
				</CustomText>
				<LevelButtons
					onPressN={() => setLevel('Novice')}
					onPressJ={() => setLevel('Junior')}
					onPressS={() => setLevel('Senior')}
				/>
				<Button
					title='Start Building'
					variant='black'
					style={styles.startButton}
					onPress={() => {
						if (name === '' || event === '' || level === '') {
							alert('Please input all fields!');
						} else {
							startBuilding(name, event, level);
						}
					}}
				/>
			</View>
		);
	}

	return (
		<LinearGradient
			colors={colors.gradient}
			style={styles.container}>
			{isBuilding ? (
				<View style={styles.logo}>
					<H1Logo></H1Logo>
				</View>
			) : (
				<Header></Header>
			)}
			<CustomText
				style={styles.text}
				bold>
				Routine Builder
			</CustomText>
			{isBuilding ? (
				<RoutineBuilderForm
					routine_id={routineId}
					event={eventId}
					onSubmit={() => {
						setIsBuilding(false);
						navigation.navigate('RoutineLibrary' as never);
					}}
					handleDelete={() => {
						handleDelete(routineId, eventId);
						setIsBuilding(false);
					}}
				/>
			) : (
				<RoutineSetUpForm />
			)}
			<HomeButton></HomeButton>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	eventButtons: {
		alignItems: 'center',
		marginVertical: 5,
	},
	formContainer: {
		flexDirection: 'column',
		borderRadius: 15,
		alignItems: 'center',
		backgroundColor: colors.fade1,
		height: 'auto',
		width: 350,
		position: 'absolute',
		top: 215,
	},
	inputText: {
		marginLeft: 20,
		color: colors.black,
	},
	inputView: {
		backgroundColor: colors.white,
		borderRadius: 15,
		height: 50,
		width: 310,
		justifyContent: 'center',
		marginVertical: 5,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	logo: {
		position: 'absolute',
		top: 50,
	},
	startButton: {
		width: 200,
		height: 50,
		marginVertical: 30,
	},
	text: {
		color: colors.black,
		fontSize: 30,
		position: 'absolute',
		top: 130,
	},
	text2: {
		color: colors.black,
		fontSize: 20,
		marginTop: 20,
		alignSelf: 'flex-start',
		marginLeft: 20,
	},
});
