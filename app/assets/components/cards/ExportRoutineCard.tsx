import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, CustomText } from '../../../config/theme';

interface Props {
	name: string;
	sv: string;
	isSelected: boolean;
}

export default function ExportRoutineCard(props: Props) {
	const { name, sv, isSelected } = props;

	return (
		<View
			style={[
				styles.container,
				isSelected
					? { backgroundColor: colors.black }
					: { backgroundColor: colors.white },
			]}>
			<View style={styles.col}>
				<CustomText
					style={[
						styles.name,
						isSelected ? { color: colors.white } : { color: colors.black },
					]}
					bold>
					{name}
				</CustomText>
				<CustomText
					style={[
						styles.text,
						isSelected ? { color: colors.white } : { color: colors.black },
					]}>
					Start Value: {sv}
				</CustomText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	col: {
		flexDirection: 'column',
		gap: 3,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		color: colors.black,
		width: 320,
		height: 80,
		paddingHorizontal: 15,
		marginVertical: 4,
		marginHorizontal: 10,
		borderRadius: 15,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	text: {
		fontSize: 20,
	},
	name: {
		fontSize: 20,
	},
});
