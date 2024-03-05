import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';

import { CustomText, colors } from '../config/theme';
import EventButtons from '../assets/components/buttons/EventButtons';
import LevelButtons from '../assets/components/buttons/LevelButtons';
import Button from '../assets/components/buttons/Buttons';
import Header from '../assets/components/utilities/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import RoutineBuilderForm from '../assets/components/forms/RoutineBuilderForm';

async function addBaseRoutine(name: string, event: string, level: string) {
    const user_uid = firebase_auth.currentUser.uid;
    const routineRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'routines');
    try {
        await setDoc(doc(routineRef, name), {
            name: name,
            event: event,
            level: level,
        }, { merge: true });
    } catch (error) {
        console.error('Error adding connection:', error);
    }
}

async function handleDelete(name: string, event: string,) {
    const user_uid = firebase_auth.currentUser.uid;
    const routineRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'routines');
    try {
        const docRef = doc(routineRef, name);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

export default function RoutineBuilder() {
    const [isBuilding, setIsBuilding] = useState(false);
    const [routineId, setRoutineId] = useState('')
    const [eventId, setEventId] = useState('');

    const startBuilding = (name: string, event: string, level: string) => {
        setIsBuilding(true);
        setRoutineId(name)
        setEventId(event)
        addBaseRoutine(name, event, level);
    };

    function RoutineSetUpForm() {
        const [name, setName] = useState('')
        const [event, setEvent] = useState('Bars');
        const [level, setLevel] = useState('');

        return (
            <ScrollView contentContainerStyle={styles.scrollContainer} scrollEnabled={false}>
                <CustomText style={styles.text2} bold>Routine Name:</CustomText>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        editable
                        placeholder='Routine Name'
                        placeholderTextColor={colors.grey200}
                        maxLength={30}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                </View>
                <CustomText style={styles.text2} bold>Event:</CustomText>
                <View style={styles.eventButtons}>
                    <EventButtons
                        variant="build"
                        selectedVariant={event}
                        onPress1
                        onPress2={() => setEvent('Bars')}
                        onPress3={() => setEvent('Beam')}
                        onPress4={() => setEvent('Floor')}
                    />
                </View>
                <CustomText style={styles.text2} bold>Level:</CustomText>
                <LevelButtons
                    onPress6={() => setLevel('6')}
                    onPress7={() => setLevel('7')}
                    onPress8={() => setLevel('8')}
                    onPress9={() => setLevel('9')}
                    onPress10={() => setLevel('10')}
                    onPressN={() => setLevel('Novice')}
                    onPressJ={() => setLevel('Junior')}
                    onPressS={() => setLevel('Senior')}
                />
                <Button 
                title= 'Start Building' 
                variant="black" 
                style={styles.startButton} 
                onPress={() => {
                    if (name === '' || event === '' || level === '') {
                        alert('Please input all fields!')
                    } else {
                    startBuilding(name, event, level)}}}/>
            </ScrollView>
        );
    }

    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}>
            <Header></Header>
            <CustomText style={styles.text} bold>Routine Builder</CustomText>
            {isBuilding ? 
            <RoutineBuilderForm routine_id={routineId} event={eventId} onSubmit={()=> setIsBuilding(false)} handleDelete={() => {handleDelete(routineId, eventId); setIsBuilding(false)}}/>: 
            <RoutineSetUpForm/>}
            <HomeButton></HomeButton>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        width: 200,
        height: 50,
        position: 'absolute',
        bottom: 20,
    },
    text: {
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 130,
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: colors.fade1,
        height: 470,
        width: 350,
        marginTop: 190,
        marginBottom: 150,
    },
    eventButtons: {
        alignItems: 'center',
        marginVertical: 5,
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 50,
        width: 310,
        justifyContent:"center",
        marginVertical: 5,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    inputText:{
        marginLeft: 20,
        color:colors.black
    },
    text2: {
        color: colors.black,
        fontSize: 20,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
});