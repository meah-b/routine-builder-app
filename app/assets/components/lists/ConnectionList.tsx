import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';

import ConnectionCard from '../cards/ConnectionCard';
import AppContext from '../../../config/context';

interface ConFormProps {
	event: string;
}

export default function ConnectionList(props: ConFormProps) {
	const { event } = props;
	const { selectedAthlete } = React.useContext(AppContext);
	const user_uid = selectedAthlete
		? selectedAthlete
		: firebase_auth.currentUser.uid;
	const conRef = collection(
		doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()),
		'connections'
	);
	const [querySnapshot, setQuerySnapshot] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const snapshot = await getDocs(conRef);
			setQuerySnapshot(snapshot.docs);
		};
		fetchData();
	}, []);

	const twoButtonAlert = (name) =>
		Alert.alert('Caution', `Are you sure you want to delete ${name}?`, [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				onPress: () => handleDelete(name),
			},
		]);

	const handleDelete = async (docId) => {
		try {
			const docRef = doc(conRef, docId);
			await deleteDoc(docRef);
			setQuerySnapshot((prevSnapshot) =>
				prevSnapshot.filter((doc) => doc.id !== docId)
			);
		} catch (error) {
			console.error('Error deleting document:', error);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{querySnapshot.map((doc) => {
					let sum = 0;
					doc.data().dvs.forEach((num) => {
						sum += Number(num);
					});
					return (
						<ConnectionCard
							key={doc.id}
							handleDelete={() => twoButtonAlert(doc.id)}
							name={doc.data().name}
							difficulty={'Elements: ' + doc.data().difficulties.join('-')}
							cv={'CV: ' + doc.data().cv}
							dv={'Total DV: ' + (Number(doc.data().cv) + sum).toFixed(1)}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 160,
		height: 400,
		width: 370,
	},
	scrollContainer: {
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
