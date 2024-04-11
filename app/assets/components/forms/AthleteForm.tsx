import React, {useState} from "react";
import { View, StyleSheet, TextInput, ActivityIndicator, Keyboard } from "react-native";
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';
import { collection, doc, setDoc, addDoc, getDoc, updateDoc } from 'firebase/firestore';

import { colors, CustomText } from "../../../config/theme";
import Button from "../buttons/Buttons";
import AppContext from '../../../config/context';


interface SkillFormProps {
    onSubmit: () => void;
    isEditing: boolean;
    oldLevel: string;
    oldName: string;
}

export default function AthleteForm(props: SkillFormProps){
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [loading, setLoading] = useState(false);
    const { onSubmit, isEditing, oldLevel, oldName } = props;
    const { selectedAthlete } = React.useContext(AppContext); 

    async function addUser(){
        setLoading(true);
        try {
            const usersRef = collection(firestore_db, 'users');
            const newUserRef = await addDoc(usersRef, {
                account_type: 'Unreg Athlete',
                full_name: name,
                level: level,
            })
            const newRef = doc(firestore_db, "users", newUserRef.id);
            const eventsRef = collection(newRef, "events");
            await setDoc(doc(eventsRef, "vault"), {});  
            await setDoc(doc(eventsRef, "bars"), {});
            await setDoc(doc(eventsRef, "beam"), {});
            await setDoc(doc(eventsRef, "floor"), {});
            addAthlete(newUserRef.id)
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    async function addAthlete(athleteId: string) {
        try {
            const user_uid = firebase_auth.currentUser.uid;
            const user_doc = doc(firestore_db, 'users', user_uid);
    
            const userDocSnapshot = await getDoc(user_doc);
            const currentAthletes = userDocSnapshot.data().athletes || {};
    
            currentAthletes[athleteId] = {
                account_type: 'Unreg Athlete',
                full_name: name, 
                level: level};
    
            await updateDoc(user_doc, { athletes: currentAthletes });
        } catch (error) {
            console.error('Error adding athlete:', error);
        } finally {
            setLoading(false);
            onSubmit();
        }
    }

    async function updateAthlete(){
        try {
            const editRef = doc(firestore_db, "users", selectedAthlete);
            await setDoc(editRef, {
                full_name: name,
                level: level
            }, {merge: true});

            const user_uid = firebase_auth.currentUser.uid;
            const user_doc = doc(firestore_db, 'users', user_uid);
            const userDocSnapshot = await getDoc(user_doc);
            const currentAthletes = userDocSnapshot.data().athletes || {};
            currentAthletes[selectedAthlete] = {
                account_type: 'Unreg Athlete',
                full_name: name, 
                level: level};
            await updateDoc(user_doc, { athletes: currentAthletes });
        } catch (error) {
            console.error('Error adding user:', error);
        } finally {
            onSubmit();
        }
    }

    

    return (
        <View onTouchStart={()=>Keyboard.dismiss()} style={styles.container}>
            <CustomText style={styles.h1} bold>Add Athlete</CustomText>
            <CustomText style={styles.text} bold>Full Name:</CustomText>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                editable
                placeholder={isEditing ? oldName : 'Full Name'}
                placeholderTextColor={colors.grey200}
                maxLength={30}
                onChangeText={(text) => setName(text)}
                value={name}
                />
            </View>
            <CustomText style={styles.text} bold>Level:</CustomText>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                editable
                placeholder={isEditing ? oldLevel : 'Level'}
                placeholderTextColor={colors.grey200}
                maxLength={30}
                onChangeText={(text) => setLevel(text)}
                value={level}
                />
            </View>
            { loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 40}}/>
                ) : (
            <Button
            onPress={() => {
                if (name === '' || level === '') {
                    alert('Please input all values!');
                } else {
                    (isEditing ? updateAthlete() : addUser());
                }
            }}
            variant='black'
            title='Save'
            style={{width: 180, height: 50, marginTop: 30}}
            />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.fade1,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 200,
        height: 420,
        width: 370,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    h1: {
        color: colors.black,
        fontSize: 25,
        marginTop: 20,
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 60,
        width: 340,
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
        color:colors.black,
        fontSize: 16,
    },
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
})