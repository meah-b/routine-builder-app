import * as Font from 'expo-font';
import React, { ReactNode, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface CustomTextProps {
	children: ReactNode;
	style?: StyleProp<TextStyle>;
	bold?: boolean;
}

export const colors = {
	white: '#fff',
	grey100: '#D9D9D9',
	grey200: '#9C9C9C',
	grey300: '#797979',
	black: '#000',
	fade1: '#f0d4fc',
	fade2: 'rgba(255, 255, 255, 0.35)',
	purple: '#9747FF',
	purple200: '#5C009F',
	pink: '#FFBBF8',
	formPurple: '#d1c4e9',
	gradient: ['#9747FF', '#FFBBF8'] as const,
	gradient2: ['#9747FF', '#FFBBF8', '#FFF'] as const,
};

export const CustomText = ({ style, children, bold }: CustomTextProps) => {
	const [fontLoaded, setFontLoaded] = useState(false);

	useEffect(() => {
		async function loadFont() {
			await Font.loadAsync({
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				'jost-bold': require('../assets/fonts/Jost-Bold.ttf'),
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				'jost-regular': require('../assets/fonts/Jost-Regular.ttf'),
			});

			setFontLoaded(true);
		}

		loadFont();
	}, []);

	if (!fontLoaded) {
		return <Text>Loading...</Text>;
	}

	const fontFamily = bold ? 'jost-bold' : 'jost-regular';

	return <Text style={[{ fontFamily }, style]}>{children}</Text>;
};
