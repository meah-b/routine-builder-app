import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { colors, CustomText } from '../../../config/theme';

interface Props {
	name: string;
	difficulty: string;
	category: string;
	handleDelete: () => void;
}

export default function SkillCard(props: Props) {
	const { name, difficulty, category, handleDelete } = props;
	return (
		<View style={styles.container}>
			<View style={styles.col}>
				<CustomText
					style={styles.name}
					bold>
					{name}
				</CustomText>
				<CustomText style={styles.difficulty}>
					Difficulty: {difficulty}
				</CustomText>
			</View>
			<View style={styles.col}>
				<AntDesign
					color='black'
					name='delete'
					size={24}
					style={styles.icon}
					onPress={handleDelete}
				/>
				<CustomText style={styles.category}>{category}</CustomText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	category: {
		fontSize: 20,
		position: 'absolute',
		top: 2,
		right: 0,
	},
	col: {
		flexDirection: 'column',
		gap: 4,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: colors.white,
		color: colors.black,
		width: 350,
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
	difficulty: {
		fontSize: 20,
	},
	icon: {
		position: 'absolute',
		bottom: 3,
		right: 0,
	},
	name: {
		fontSize: 20,
	},
});
