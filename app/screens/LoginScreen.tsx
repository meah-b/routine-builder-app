import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { firebase_auth } from '../Firebase/firebaseConfig';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../assets/components/buttons/Buttons';
import {
	GradientSvg1,
	GradientSvg2,
} from '../assets/components/utilities/Gradients';
import { Logo } from '../assets/components/utilities/Logo';
import TxtInput from '../assets/components/utilities/TextInput';
import { colors } from '../config/theme';

type RootStackParamList = {
	SignUp: undefined;
};

interface LoginScreenProps {
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const auth = firebase_auth;

	const signIn = async () => {
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.log(error);
			alert('Sign in failed: ' + error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			scrollEnabled={false}>
			<View style={styles.gradient1}>
				<GradientSvg1 />
			</View>
			<View style={styles.gradient2}>
				<GradientSvg2 />
			</View>
			<View style={styles.logo}>
				<Logo />
			</View>
			<View style={styles.loginContainer}>
				<TxtInput
					variant={'email'}
					onChange={(text) => setEmail(text)}
					value={email}
				/>
				<TxtInput
					variant={'password'}
					onChange={(text) => setPassword(text)}
					value={password}
				/>
			</View>
			<View style={styles.loginButtonContainer}>
				{loading ? (
					<ActivityIndicator
						size='large'
						color='#0000ff'
					/>
				) : (
					<>
						<Button
							onPress={signIn}
							variant='black'
							title='Login'
							style={{ width: 140 }}
						/>
						<Button
							onPress={() => navigation.navigate('SignUp' as never)}
							variant='black'
							title='Sign Up'
							style={{ width: 140 }}
						/>
					</>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	alternateContainer: {
		position: 'absolute',
		top: 680,
		flexDirection: 'column',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	gradient1: {
		...StyleSheet.absoluteFillObject,
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		shadowColor: colors.black,
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	gradient2: {
		...StyleSheet.absoluteFillObject,
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		shadowColor: colors.black,
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: 'black',
		marginHorizontal: 10,
	},
	loginButtonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		top: 450,
		gap: 5,
	},
	loginContainer: {
		position: 'absolute',
		top: 320,
		flexDirection: 'column',
		alignItems: 'center',
	},
	logo: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 120,
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	tempInputView: {
		backgroundColor: colors.white,
		borderRadius: 15,
		height: 50,
		width: 285,
		marginVertical: 20,
		justifyContent: 'center',
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
});
