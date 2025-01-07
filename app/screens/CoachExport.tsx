import { LinearGradient } from 'expo-linear-gradient';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../assets/components/buttons/Buttons';
import AthleteCard from '../assets/components/cards/AthleteCard';
import ExportForm from '../assets/components/forms/ExportForm';
import Header from '../assets/components/utilities/Header';
import { CustomText, colors } from '../config/theme';

export default function CoachExport() {
	const user_uid = firebase_auth.currentUser.uid;
	const user_doc = doc(firestore_db, 'users', user_uid);
	const [sort, setSort] = React.useState('desc');
	const [form, setForm] = React.useState(0);
	const [querySnapshot, setQuerySnapshot] = React.useState([]);
	const [selectedAthletes, setSelectedAthletes] = React.useState([]);

	function sortDescending(snapshot) {
		const levelsArray = snapshot.map((doc) => parseInt(doc.data().level));
		levelsArray.sort((a, b) => b - a);
		const sortedSnapshot = levelsArray.map((level) => {
			return snapshot.find((doc) => parseInt(doc.data().level) === level);
		});
		return sortedSnapshot;
	}

	function sortAscending(snapshot) {
		const levelsArray = snapshot.map((doc) => parseInt(doc.data().level));
		levelsArray.sort((a, b) => a - b);
		const sortedSnapshot = levelsArray.map((level) => {
			return snapshot.find((doc) => parseInt(doc.data().level) === level);
		});
		return sortedSnapshot;
	}

	const fetchData = async () => {
		try {
			const userDocSnapshot = await getDoc(user_doc);
			const athletesObj = userDocSnapshot.data().athletes || {};
			const athleteIds = Object.keys(athletesObj);
			const snapshotPromises = athleteIds.map(async (athleteId) => {
				const docRef = doc(firestore_db, 'users', athleteId);
				return await getDoc(docRef);
			});
			const snapshotResults = await Promise.all(snapshotPromises);
			setQuerySnapshot(snapshotResults);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const toggleAthleteSelection = (athleteId) => {
		if (selectedAthletes.includes(athleteId)) {
			setSelectedAthletes(selectedAthletes.filter((id) => id !== athleteId));
		} else {
			setSelectedAthletes([...selectedAthletes, athleteId]);
		}
	};

	function SelectAthletes() {
		return (
			<View style={styles.container}>
				<Header></Header>
				<CustomText
					style={styles.h1}
					bold>
					Select Athletes To Export:
				</CustomText>
				<TouchableOpacity
					style={styles.sortButton}
					onPress={() => {
						if (sort === 'desc') {
							setSort('asc');
						} else {
							setSort('desc');
						}
					}}>
					<FontAwesome5
						color={colors.black}
						name={
							sort === 'desc' ? 'sort-numeric-down-alt' : 'sort-numeric-up-alt'
						}
						size={24}
					/>
				</TouchableOpacity>
				<View style={styles.list_container}>
					<ScrollView contentContainerStyle={styles.scrollContainer}>
						{(sort === 'asc'
							? sortAscending(querySnapshot)
							: sortDescending(querySnapshot)
						).map((doc) => (
							<AthleteCard
								key={doc.id}
								handleDelete={() => {}}
								name={doc.data().full_name}
								level={doc.data().level}
								isSelected={selectedAthletes.includes(doc.id)}
								onPress={() => toggleAthleteSelection(doc.id)}
							/>
						))}
					</ScrollView>
				</View>
				<Button
					style={styles.updateButton}
					title='Export Selected Athletes'
					variant='black'
					onPress={() => setForm(1)}></Button>
			</View>
		);
	}

	return (
		<LinearGradient
			colors={colors.gradient}
			style={styles.container}>
			{form === 0 ? (
				<SelectAthletes />
			) : (
				<ExportForm
					onSubmit={() => setForm(0)}
					selectedAthletes={selectedAthletes}
				/>
			)}
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	h1: {
		color: colors.black,
		fontSize: 22,
		position: 'absolute',
		top: 190,
		right: 90,
	},
	list_container: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 160,
		height: 460,
		width: 370,
	},
	scrollContainer: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sortButton: {
		position: 'absolute',
		height: 50,
		width: 50,
		top: 195,
		left: 330,
	},
	text: {
		fontSize: 18,
		textDecorationLine: 'underline',
		color: colors.black,
	},
	updateButton: {
		height: 50,
		width: 235,
		marginTop: 20,
	},
});
