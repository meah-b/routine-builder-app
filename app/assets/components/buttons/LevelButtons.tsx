import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from './Buttons';
interface Props {
	onPressN: () => void;
	onPressJ: () => void;
	onPressS: () => void;
}
export default function LevelButtons(props: Props) {
	const { onPressN, onPressJ, onPressS } = props;
	const [selected, setSelected] = useState('');
	return (
		<View style={styles.container}>
			<View style={styles.levels}>
				<Button
					title='Novice'
					variant={selected === 'Novice' ? 'black' : 'white'}
					style={styles.levelButtons}
					onPress={() => {
						onPressN();
						setSelected('Novice');
					}}
				/>
				<Button
					title='Junior'
					variant={selected === 'Junior' ? 'black' : 'white'}
					style={styles.levelButtons}
					onPress={() => {
						onPressJ();
						setSelected('Junior');
					}}
				/>
				<Button
					title='Senior'
					variant={selected === 'Senior' ? 'black' : 'white'}
					style={styles.levelButtons}
					onPress={() => {
						onPressS();
						setSelected('Senior');
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	levels: {
		flexDirection: 'row',
		marginVertical: 4,
	},
	levelButtons: {
		height: 50,
		width: 95,
		marginHorizontal: 6,
	},
	numButtons: {
		height: 50,
		width: 55,
		marginHorizontal: 4,
	},
});
