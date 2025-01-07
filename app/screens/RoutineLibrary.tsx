import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/utilities/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import EventButtons from '../assets/components/buttons/EventButtons';
import Button from '../assets/components/buttons/Buttons';
import RoutineList from '../assets/components/lists/RoutineList';
import SkillList from '../assets/components/lists/SkillList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function RoutineLibrary({ navigation }) {
	const [selectedVariant, setSelectedVariant] = React.useState('Vault');
	const [order, setOrder] = React.useState('desc');

	const handleAddRoutine = () => {
		navigation.navigate('Routine Builder' as never);
	};

	return (
		<LinearGradient
			colors={colors.gradient}
			style={styles.container}>
			<Header />
			<CustomText
				style={styles.text}
				bold>
				Routine Library
			</CustomText>
			<EventButtons
				variant='four'
				selectedVariant={selectedVariant}
				onPress1={() => setSelectedVariant('Vault')}
				onPress2={() => setSelectedVariant('Bars')}
				onPress3={() => setSelectedVariant('Beam')}
				onPress4={() => setSelectedVariant('Floor')}
			/>
			<Button
				style={styles.addButton}
				title='Add Routine'
				variant='black'
				onPress={handleAddRoutine}
			/>
			<TouchableOpacity
				style={styles.sortButton}
				onPress={() => {
					order === 'desc' ? setOrder('asc') : setOrder('desc');
				}}>
				<FontAwesome5
					color={colors.black}
					name={
						order === 'desc' ? 'sort-numeric-down-alt' : 'sort-numeric-up-alt'
					}
					size={24}
				/>
			</TouchableOpacity>
			{selectedVariant === 'Vault' ? (
				<SkillList
					event={selectedVariant}
					order={order}
				/>
			) : (
				<RoutineList
					event={selectedVariant}
					order={order}></RoutineList>
			)}
			<HomeButton />
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	addButton: {
		position: 'absolute',
		height: 35,
		width: 140,
		top: 255,
		left: 20,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sortButton: {
		position: 'absolute',
		height: 50,
		width: 50,
		top: 265,
		left: 330,
	},
	text: {
		color: colors.black,
		fontSize: 30,
		position: 'absolute',
		top: 130,
	},
});
