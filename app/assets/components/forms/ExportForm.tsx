import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Share,
} from 'react-native';
import { firestore_db } from '../../../Firebase/firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { colors, CustomText } from '../../../config/theme';
import { H1Logo } from '../utilities/Logo';
import ExportRoutineCard from '../cards/ExportRoutineCard';
import Button from '../buttons/Buttons';

interface Props {
	onSubmit: () => void;
	selectedAthletes: any[];
}

export default function ExportForm(props: Props) {
	const navigation = useNavigation();
	const { onSubmit, selectedAthletes } = props;
	const [routines, setRoutines] = useState({});
	const [loading, setLoading] = useState(false);
	const [routinesToExport, setRoutinesToExport] = useState({});

	const fetchData = async () => {
		setLoading(true);
		try {
			const routinesData = {};
			for (const athlete of selectedAthletes) {
				const athleteRoutines = {};
				const userRef = doc(firestore_db, 'users', athlete);
				const userSnapshot = await getDoc(userRef);
				const name = userSnapshot.data().full_name;
				const vaultRef = collection(
					doc(firestore_db, 'users', athlete, 'events', 'vault'),
					'skills'
				);
				const snapshot = await getDocs(vaultRef);
				athleteRoutines['vault'] = snapshot.docs.map((doc) => {
					const data = doc.data();
					return { id: doc.id, ...data };
				});
				for (const event of ['bars', 'beam', 'floor']) {
					const routinesRef = collection(
						doc(firestore_db, 'users', athlete, 'events', event),
						'routines'
					);
					const snapshot = await getDocs(routinesRef);
					athleteRoutines[event] = snapshot.docs.map((doc) => {
						const data = doc.data();
						return { id: doc.id, ...data };
					});
				}
				routinesData[name] = athleteRoutines;
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

	const handleRoutineSelection = (athleteId, event, routineId) => {
		const updatedRoutinesToExport = { ...routinesToExport };
		if (
			updatedRoutinesToExport[athleteId] &&
			updatedRoutinesToExport[athleteId][event]
		) {
			if (updatedRoutinesToExport[athleteId][event].includes(routineId)) {
				updatedRoutinesToExport[athleteId][event] = updatedRoutinesToExport[
					athleteId
				][event].filter((id) => id !== routineId);
			} else {
				updatedRoutinesToExport[athleteId][event].push(routineId);
			}
		} else {
			updatedRoutinesToExport[athleteId] = {
				...updatedRoutinesToExport[athleteId],
				[event]: [routineId],
			};
		}
		setRoutinesToExport(updatedRoutinesToExport);
	};

	const exportRoutines = () => {
		let exportText = '';
		Object.entries(routinesToExport).forEach(([athleteId, athleteData]) => {
			let totalSV = 0;
			exportText += `Athlete: ${athleteId}\n`;
			Object.entries(athleteData).forEach(([event, routineIds]) => {
				exportText += `Event: ${event}\n`;
				routineIds.forEach((routineId) => {
					if (event === 'vault') {
						const vaultData = findVaultData(
							routines[athleteId][event],
							routineId
						);
						if (vaultData) {
							totalSV += parseInt(vaultData.difficulty.value);
							exportText += `  Routine: ${vaultData.name}\n`;
							exportText += `  Start Value: ${vaultData.difficulty.value}\n\n`;
						}
					} else {
						const routineData = findRoutineData(
							routines[athleteId][event],
							routineId
						);
						totalSV += routineData.sv;
						if (routineData) {
							exportText += `  Routine: ${routineId}\n`;
							exportText += `  Skills: ${routineData.skills.join(', ')}\n`;
							exportText += `  Connections: ${routineData.connections.join(
								', '
							)}\n`;
							exportText += `  Start Value: ${routineData.sv}\n`;
						}
					}
				});
			});
			exportText += `Total Start Value: ${totalSV}`;
		});
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
		<View style={styles.container}>
			<H1Logo />
			<CustomText
				style={styles.h1}
				bold>
				Select Routines To Export:
			</CustomText>
			{!loading ? (
				<ScrollView style={styles.scrollView}>
					{Object.entries(routines).map(([athleteId, athleteData]) => (
						<View key={athleteId}>
							<CustomText
								style={styles.athleteName}
								bold>
								{athleteId}
							</CustomText>
							{Object.entries(athleteData).map(([event, eventRoutines]) => (
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
												onPress={() =>
													handleRoutineSelection(athleteId, event, routine.id)
												}
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
														routinesToExport[athleteId] &&
														routinesToExport[athleteId][event] &&
														routinesToExport[athleteId][event].includes(
															routine.id
														)
													}
												/>
											</TouchableOpacity>
										))
									) : (
										<CustomText style={styles.noRoutines}>
											No routines
										</CustomText>
									)}
								</View>
							))}
						</View>
					))}
				</ScrollView>
			) : (
				<CustomText
					style={{ color: colors.black, fontSize: 25, marginVertical: 243 }}>
					Loading Routine Data...
				</CustomText>
			)}
			<View style={{ flexDirection: 'row', gap: 10 }}>
				<Button
					variant='black'
					onPress={() => onSubmit()}
					style={styles.button}
					title='Reselect Athletes'
				/>
				<Button
					variant='black'
					onPress={() => exportRoutines()}
					style={styles.button2}
					title='Export'
				/>
			</View>
		</View>
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
