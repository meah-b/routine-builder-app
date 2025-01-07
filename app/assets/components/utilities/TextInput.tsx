import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

import { colors } from '../../../config/theme';

interface TxtInputProps {
	variant: 'email' | 'password';
	value: string;
	onChange: (text: string) => void;
}

export default function TxtInput({ variant, onChange, value }: TxtInputProps) {
	return (
		<View style={styles.inputView}>
			<AntIcon
				style={styles.icon}
				name={
					variant === 'email' ? 'user' : variant === 'password' ? 'lock' : null
				}
				size={20}
				color={colors.black}
			/>
			<TextInput
				style={styles.inputText}
				editable
				placeholder={
					variant === 'email'
						? 'Email'
						: variant === 'password'
						? 'Password'
						: null
				}
				placeholderTextColor={colors.black}
				maxLength={30}
				autoCapitalize='none'
				secureTextEntry={variant === 'password'}
				onChangeText={onChange}
				value={value}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		left: 15,
	},
	inputView: {
		backgroundColor: colors.white,
		borderRadius: 15,
		height: 50,
		width: 285,
		marginBottom: 10,
		justifyContent: 'center',
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	inputText: {
		position: 'absolute',
		left: 50,
		color: colors.black,
	},
});
