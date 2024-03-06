import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { collection, doc, getDocs } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';

import { colors } from '../config/theme';
import SectionCard from '../assets/components/cards/SectionCard';
import Header from '../assets/components/utilities/Header';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
    const events = ['vault', 'bars', 'beam', 'floor']
    const user_uid = firebase_auth.currentUser.uid;
    const [skillsLength, setSkillsLength] = useState(0);
    const [connectionsLength, setConnectionsLength] = useState(0);
    const [routinesLength, setRoutinesLength] = useState(0);

    const fetchData = async () => {
        let skillsSum = 0;
        let connectionsSum = 0;
        let routinesSum = 0;
        for (let i = 0; i < 4; i++) {
            const skillsRef = collection(doc(firestore_db, 'users', user_uid, 'events', events[i]), 'skills');
            const connectionsRef = collection(doc(firestore_db, 'users', user_uid, 'events', events[i]), 'connections');
            const routinesRef = collection(doc(firestore_db, 'users', user_uid, 'events', events[i]), 'routines');
            const skillsSnapshot = await getDocs(skillsRef);
            const connectionsSnapshot = await getDocs(connectionsRef);
            const routinesSnapshot = await getDocs(routinesRef);
            if (i==0) {
                routinesSum += skillsSnapshot.docs.length;
            }
            skillsSum += skillsSnapshot.docs.length;
            connectionsSum += connectionsSnapshot.docs.length;
            routinesSum += routinesSnapshot.docs.length;
        }
        setSkillsLength(skillsSum);
        setConnectionsLength(connectionsSum);
        setRoutinesLength(routinesSum);
    };

    useEffect(() => {
        fetchData();
    }, [user_uid]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [user_uid])
    );

    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}>
            <Header></Header>
            <View style={{marginTop: 90}}>
                <SectionCard variant="Skills" count={skillsLength} page='Skill Library'></SectionCard>
                <SectionCard variant="Connections" count={connectionsLength} page='Connection Library'></SectionCard>
                <SectionCard variant="Routines" count={routinesLength} page='Routine Library'></SectionCard>
                <SectionCard variant="Builder" count page='Routine Builder'></SectionCard>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
