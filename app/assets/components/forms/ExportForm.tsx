import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { firestore_db } from '../../../Firebase/firebaseConfig';
import { collection, doc, getDocs } from 'firebase/firestore';

import { colors, CustomText } from "../../../config/theme";
import { H1Logo } from "../utilities/Logo";

interface Props {
    onSubmit: () => void;
    selectedAthletes: any[];
}

export default function ExportForm(props: Props){
    const { onSubmit, selectedAthletes } = props;
    const [routinesToExport, setRoutinesToExport] = useState({}); 

    const fetchData = async () => {
        try {
            const routinesData = {};
            for (const athlete of selectedAthletes) {
                const athleteRoutines = {};
                for (const event of ['vault', 'bars', 'beam', 'floor']) {
                    const routinesRef = collection(doc(firestore_db, 'users', athlete, 'events', event), 'routines');
                    const snapshot = await getDocs(routinesRef);
                    athleteRoutines[event] = snapshot.docs;
                }
                routinesData[athlete] = athleteRoutines;
            }
            setRoutinesToExport(routinesData);
        } catch (error) {
            console.error('Error fetching routines:', error);
        }
    };
    
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <H1Logo/>
            <CustomText style={styles.h1} bold>Add Athlete</CustomText>
        </View>
    )
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
        fontSize: 25,
        marginTop: 20,
    },
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
})