import React from 'react';
import {
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';

import { colors, CustomText } from '../../../config/theme';

interface Props {
	onPress: () => void;
	variant: string;
	title: string;
	style: StyleProp<ViewStyle>;
}

export default function Button(props: Props) {
	const { onPress, variant, title, style } = props;
	return (
		<TouchableOpacity
			style={[
				variant === 'login' ? styles.loginContainer : null,
				variant === 'black'
					? {
							...styles.standardContainer,
							backgroundColor: colors.black,
					  }
					: null,
				variant === 'white'
					? {
							...styles.standardContainer,
							backgroundColor: colors.white,
					  }
					: null,
				variant === 'google'
					? {
							...styles.standardContainer,
							backgroundColor: colors.white,
					  }
					: null,
				style,
			]}
			onPress={onPress}>
			<CustomText
				style={[
					styles.text,
					variant === 'login' ? { ...styles.text, color: colors.white } : null,
					variant === 'black' ? { ...styles.text, color: colors.white } : null,
					variant === 'white' ? { ...styles.text, color: colors.black } : null,
					variant === 'google' ? { ...styles.text, color: colors.black } : null,
				]}
				bold>
				{title}
			</CustomText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	loginContainer: {
		backgroundColor: colors.black,
		height: 50,
		paddingHorizontal: 120,
		borderRadius: 15,
		marginVertical: 8,
		justifyContent: 'center',
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	standardContainer: {
		height: 43,
		borderRadius: 15,
		marginVertical: 5,
		justifyContent: 'center',
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	text: {
		fontSize: 18,
		textAlign: 'center',
	},
});
