import { AntDesign } from '@expo/vector-icons';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';

import AppContext from '../../../config/context';
import { colors, CustomText } from '../../../config/theme';
import Button from '../buttons/Buttons';
import {
	calculateBarsCV,
	calculateBeamCV,
	calculateFloorCV,
} from '../utilities/ConnectionCalculation';

interface ConnectionFormProps {
	event: string;
	onSubmit: () => void;
}

export default function ConnectionForm(props: ConnectionFormProps) {
	const [selected, setSelected] = useState([]);
	const [type, setType] = useState('');
	const [name, setName] = useState('');
	const { event, onSubmit } = props;
	const { selectedAthlete } = React.useContext(AppContext);
	const user_uid = selectedAthlete
		? selectedAthlete
		: firebase_auth.currentUser.uid;
	const skillsRef = collection(
		doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()),
		'skills'
	);
	const [querySnapshot, setQuerySnapshot] = useState([]);
	const difficulties: string[] = [];
	const dvs: string[] = [];

	const updateSelection = (selectedItems: string[]) => {
		const sortedSelectedOptions = [...selectedItems].sort((a, b) =>
			a.localeCompare(b)
		);
		setSelected(sortedSelectedOptions);
	};

	useEffect(() => {
		const fetchData = async () => {
			const snapshot = await getDocs(skillsRef);
			setQuerySnapshot(snapshot.docs);
		};
		fetchData();
	}, []);

	function calculateCV(selected: string[]) {
		let cv = 0;
		const selectedSkills = selected.map((item) => item);
		const skills = selectedSkills.map((selectedId) => {
			const doc = querySnapshot.find((doc) => doc.id === selectedId);
			difficulties.push(doc.data().difficulty.label);
			dvs.push(doc.data().difficulty.value);
			return {
				category: doc.data().category.value,
				difficulty: doc.data().difficulty.label,
			};
		});
		type Skill = {
			difficulty: string;
			category: string;
		};
		const skillArray: Skill[] = skills;
		if (event === 'Floor') {
			const result = calculateFloorCV(skillArray, type);
			result.forEach((num) => {
				cv += num;
			});
		} else if (event === 'Bars') {
			const result = calculateBarsCV(skillArray);
			result.forEach((num) => {
				cv += num;
			});
		} else {
			const result = calculateBeamCV(skillArray);
			result.forEach((num) => {
				cv += num;
			});
		}
		return parseFloat(cv.toFixed(1));
	}

	async function addConnection() {
		const conRef = collection(
			doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()),
			'connections'
		);
		try {
			const cvValue = calculateCV(selected);
			await setDoc(
				doc(conRef, name),
				{
					name: name,
					skills: selected,
					difficulties: difficulties,
					dvs: dvs,
					cv: cvValue,
				},
				{ merge: false }
			);
		} catch (error) {
			console.error('Error adding connection:', error);
		}
	}

	const renderData = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textSelectedStyle}>{item.label}</Text>
			</View>
		);
	};

	return (
		<View
			onTouchStart={() => Keyboard.dismiss()}
			style={styles.container}>
			<CustomText
				style={styles.h1}
				bold>
				{event}
			</CustomText>
			<ScrollView contentContainerStyle={styles.scroll}>
				<View style={[styles.inputView, { height: 50 }]}>
					<TextInput
						style={styles.inputText}
						editable
						placeholder='Connection Name'
						placeholderTextColor={colors.grey200}
						maxLength={30}
						onChangeText={(text) => setName(text)}
						value={name}
					/>
				</View>
				{event === 'Floor' && (
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={{ left: 12, fontWeight: 'bold' }}
						iconStyle={styles.iconStyle}
						data={[
							{ label: 'Indirect - Acro', value: 'Indirect' },
							{ label: 'Direct - Acro', value: 'Direct' },
							{ label: 'Mixed/Other', value: 'Mixed' },
						]}
						placeholder='Select Connection Type'
						value={type}
						onChange={setType}
						renderItem={renderData}
						labelField='label'
						valueField='value'
					/>
				)}
				<View style={styles.multi}>
					<MultiSelect
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						iconStyle={styles.iconStyle}
						placeholder='Add Skills'
						data={querySnapshot.map((doc) => ({
							label: doc.data().name,
							value: doc.id,
						}))}
						maxSelect={5}
						onChange={updateSelection}
						value={selected}
						labelField='label'
						valueField='value'
						renderItem={renderData}
						renderSelectedItem={(item, unSelect) => (
							<View style={[styles.selectedStyle]}>
								<Text style={styles.textSelectedStyle}>{item.label}</Text>
								<AntDesign
									color='black'
									name='delete'
									size={17}
									style={styles.delete}
									onPress={() => unSelect && unSelect(item)}
								/>
							</View>
						)}
					/>
				</View>
			</ScrollView>
			<Button
				onPress={() => {
					if (selected.length <= 1) {
						alert('Please add at least 2 skills!');
					} else if (name === '') {
						alert('Please name the connection!');
					} else if (event === 'Floor' && type === '') {
						alert('Please select the connection type!');
					} else {
						addConnection();
						onSubmit();
					}
				}}
				variant='black'
				title='Save'
				style={{ width: 180, height: 50, marginTop: 30, bottom: 20 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.fade1,
		borderRadius: 15,
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		top: 200,
		height: 490,
		width: 370,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	delete: {
		position: 'absolute',
		right: 20,
	},
	dropdown: {
		backgroundColor: colors.white,
		borderRadius: 15,
		height: 50,
		width: 340,
		justifyContent: 'center',
		marginVertical: 5,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	h1: {
		color: colors.black,
		fontSize: 25,
		marginTop: 20,
	},
	iconStyle: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	inputText: {
		marginLeft: 20,
		color: colors.black,
		fontSize: 16,
	},
	inputView: {
		backgroundColor: colors.white,
		borderRadius: 15,
		height: 60,
		width: 340,
		justifyContent: 'center',
		marginVertical: 5,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	item: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	label: {
		color: colors.black,
		fontSize: 18,
		marginTop: 10,
		alignSelf: 'flex-start',
	},
	multi: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		flex: 0,
	},
	placeholderStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	scroll: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		flex: 0,
	},
	selectedStyle: {
		flexDirection: 'row',
		marginHorizontal: 5,
		alignItems: 'center',
		backgroundColor: colors.fade2,
		color: colors.black,
		width: 340,
		height: 50,
		margin: 4,
		marginLeft: 15,
		marginRight: 15,
		borderRadius: 15,
	},
	textSelectedStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		position: 'absolute',
		left: 20,
	},
});
