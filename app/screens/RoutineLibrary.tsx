import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../assets/components/buttons/Buttons';
import EventButtons from '../assets/components/buttons/EventButtons';
import HomeButton from '../assets/components/buttons/HomeButton';
import RoutineList from '../assets/components/lists/RoutineList';
import SkillList from '../assets/components/lists/SkillList';
import Header from '../assets/components/utilities/Header';
import { CustomText, colors } from '../config/theme';

type RootStackParamList = {
	RoutineBuilder: undefined;
};

interface RoutineLibraryProps {
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function RoutineLibrary({ navigation }: RoutineLibraryProps) {
	const [selectedVariant, setSelectedVariant] = React.useState('Vault');
	const [order, setOrder] = React.useState('desc');

	const handleAddRoutine = () => {
		navigation.navigate('RoutineBuilder' as never);
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
					if (order === 'desc') {
						setOrder('asc');
					} else {
						setOrder('desc');
					}
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
