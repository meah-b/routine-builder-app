import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
	Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, doc, getDocs } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';

import { CustomText, colors } from '../config/theme';
import Button from '../assets/components/buttons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { H1Logo } from '../assets/components/utilities/Logo';
import ExportRoutineCard from '../assets/components/cards/ExportRoutineCard';

export default function AthleteExport() {
	const navigation = useNavigation();
	const user_uid = firebase_auth.currentUser.uid;
	const [routines, setRoutines] = useState<RoutinesData>({});
	const [loading, setLoading] = useState(false);
	const [routinesToExport, setRoutinesToExport] = useState({});

	type RoutinesData = {
		[event: string]: {
			id: string;
			sv: string;
			skills: string[];
			connections: string[];
			difficulty: {
				label: string;
				value: string;
			};
		}[];
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const routinesData = {};
			const vaultRef = collection(
				doc(firestore_db, 'users', user_uid, 'events', 'vault'),
				'skills'
			);
			const snapshot = await getDocs(vaultRef);
			routinesData['vault'] = snapshot.docs.map((doc) => {
				const data = doc.data();
				return { id: doc.id, ...data };
			});
			for (const event of ['bars', 'beam', 'floor']) {
				const routinesRef = collection(
					doc(firestore_db, 'users', user_uid, 'events', event),
					'routines'
				);
				const snapshot = await getDocs(routinesRef);
				routinesData[event] = snapshot.docs.map((doc) => {
					const data = doc.data();
					return { id: doc.id, ...data };
				});
			}
			setRoutines(routinesData);
		} catch (error) {
			console.error('Error fetching routines:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleRoutineSelection = (event, routineId) => {
		const updatedRoutinesToExport = { ...routinesToExport };
		if (updatedRoutinesToExport[event]) {
			if (updatedRoutinesToExport[event].includes(routineId)) {
				updatedRoutinesToExport[event] = updatedRoutinesToExport[event].filter(
					(id) => id !== routineId
				);
			} else {
				updatedRoutinesToExport[event].push(routineId);
			}
		} else {
			updatedRoutinesToExport[event] = [routineId];
		}
		setRoutinesToExport(updatedRoutinesToExport);
	};

	const exportRoutines = () => {
		let exportText = '';
		let totalSV = 0;

		const routinesToExportTyped: { [key: string]: string[] } = routinesToExport;

		Object.entries(routinesToExportTyped).forEach(([event, routineIds]) => {
			exportText += `Event: ${event}\n`;
			routineIds.forEach((routineId) => {
				if (event === 'vault') {
					const vaultData = findVaultData(routines[event], routineId);
					if (vaultData) {
						totalSV += parseInt(vaultData.difficulty.value);
						exportText += `  Routine: ${vaultData.name}\n`;
						exportText += `  Start Value: ${vaultData.difficulty.value}\n\n`;
					}
				} else {
					const routineData = findRoutineData(routines[event], routineId);
					if (routineData) {
						totalSV += routineData.sv;
						exportText += `  Routine: ${routineId}\n`;
						exportText += `  Skills: ${routineData.skills.join(', ')}\n`;
						exportText += `  Connections: ${routineData.connections.join(
							', '
						)}\n`;
						exportText += `  Start Value: ${routineData.sv + 10}\n\n`;
					}
				}
			});
		});
		exportText += `Total Start Value: ${totalSV}`;
		shareText(exportText);
	};

	const findRoutineData = (eventRoutines, routineId) => {
		return eventRoutines.find((routine) => routine.id === routineId);
	};

	const findVaultData = (vaults, vaultName) => {
		return vaults.find((vault) => vault.name === vaultName);
	};

	const shareText = (text) => {
		Share.share({
			message: text,
		})
			.then(() => {
				navigation.navigate('Menu' as never);
			})
			.catch((error) => console.log(error));
	};

	return (
		<LinearGradient
			colors={colors.gradient}
			style={styles.outerContainer}>
			<View style={styles.container}>
				<H1Logo />
				<CustomText
					style={styles.h1}
					bold>
					Select Routines To Export:
				</CustomText>
				{!loading ? (
					<ScrollView style={styles.scrollView}>
						{Object.entries(routines).map(([event, eventRoutines]) => (
							<View key={event}>
								<CustomText
									bold
									style={styles.eventName}>
									{event}
								</CustomText>
								{eventRoutines.length > 0 ? (
									eventRoutines.map((routine, index) => (
										<TouchableOpacity
											key={index}
											onPress={() => handleRoutineSelection(event, routine.id)}
											style={styles.routineContainer}>
											<ExportRoutineCard
												key={routine.id}
												name={routine.id}
												sv={
													event === 'vault'
														? routine.difficulty.label
														: routine.sv + 10
												}
												isSelected={
													routinesToExport[event] &&
													routinesToExport[event].includes(routine.id)
												}
											/>
										</TouchableOpacity>
									))
								) : (
									<CustomText style={styles.noRoutines}>No routines</CustomText>
								)}
							</View>
						))}
					</ScrollView>
				) : (
					<CustomText
						style={{ color: colors.black, fontSize: 25, marginVertical: 243 }}>
						Loading Routine Data...
					</CustomText>
				)}
				<Button
					variant='black'
					onPress={exportRoutines}
					style={styles.button2}
					title='Export'
				/>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	athleteName: {
		fontSize: 25,
		marginTop: 30,
		marginBottom: 5,
		marginLeft: 23,
	},
	button: {
		height: 50,
		width: 190,
		marginBottom: 60,
		marginTop: 20,
	},
	button2: {
		height: 50,
		width: 150,
		marginBottom: 60,
		marginTop: 20,
	},
	container: {
		flex: 1,
		marginTop: 60,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	eventName: {
		fontSize: 18,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 23,
	},
	h1: {
		color: colors.black,
		fontSize: 25,
		marginTop: 20,
	},
	noRoutines: {
		marginLeft: 23,
		color: colors.black,
	},
	outerContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	routineContainer: {
		padding: 10,
		marginBottom: 5,
	},
	scrollView: {
		flex: 1,
		borderRadius: 15,
		backgroundColor: colors.fade1,
		width: 350,
		height: 'auto',
		marginTop: 10,
	},
	text: {
		color: colors.black,
		fontSize: 18,
		marginTop: 20,
		alignSelf: 'flex-start',
		marginLeft: 20,
	},
});
