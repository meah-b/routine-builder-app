import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';

import { colors, CustomText } from '../config/theme';
import AppContext from '../config/context';
import SectionCard from '../assets/components/cards/SectionCard';
import Header from '../assets/components/utilities/Header';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
    const events = ['vault', 'bars', 'beam', 'floor']
    const user_uid = firebase_auth.currentUser.uid;
    const { selectedAthlete } = React.useContext(AppContext); 
    const [skillsLength, setSkillsLength] = useState(0);
    const [connectionsLength, setConnectionsLength] = useState(0);
    const [routinesLength, setRoutinesLength] = useState(0);
    const [name, setName] = useState('')

    const fetchData = async () => {
        const userRef = doc(firestore_db, 'users', user_uid)
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        if (userData.account_type === 'Coach') {
            const athleteRef = doc(firestore_db, 'users', selectedAthlete)
            const athleteSnapshot = await getDoc(athleteRef);
            setName(athleteSnapshot.data().full_name);
        }
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
    }, []);

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
            {name !== '' ? <CustomText>{name}</CustomText> : null}
            <View style={{marginTop: 90}}>
                <SectionCard variant="Skills" count={skillsLength} onPress={() => navigation.navigate('Skill Library')}></SectionCard>
                <SectionCard variant="Connections" count={connectionsLength} onPress={() => navigation.navigate('Connection Library')}></SectionCard>
                <SectionCard variant="Routines" count={routinesLength} onPress={() => navigation.navigate('Routine Library')}></SectionCard>
                <SectionCard variant="Builder" count onPress={() => navigation.navigate('Routine Builder')}></SectionCard>
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
