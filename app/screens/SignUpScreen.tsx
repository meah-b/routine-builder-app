import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { firebase_auth, firestore_db } from "../Firebase/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import {LinearGradient} from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { CustomText, colors } from "../config/theme";
import {Logo} from '../assets/components/utilities/Logo';
import Button from '../assets/components/buttons/Buttons';

export default function SignUpScreen() {
    const [fullName, setFullName] = useState('')
    const [type, setType] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = firebase_auth;

    const signUpAthlete = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            const userDocRef = doc(firestore_db, "users", user.uid);
            const eventsRef = collection(userDocRef, "events");
            await setDoc(doc(eventsRef, "vault"), {});  
            await setDoc(doc(eventsRef, "bars"), {});
            await setDoc(doc(eventsRef, "beam"), {});
            await setDoc(doc(eventsRef, "floor"), {});
            setDoc(userDocRef, {account_type: type, full_name: fullName, email: email})
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        }
    };

    const signUpCoach = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            const userDocRef = doc(firestore_db, "users", user.uid);
            setDoc(userDocRef, {account_type: type, full_name: fullName, email: email})
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        }
    };

    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            <View style={styles.logo}><Logo/></View>
            <View style={styles.inputs}>
                <CustomText style={styles.h2} >Full Name:</CustomText>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        editable
                        placeholder='Full Name'
                        placeholderTextColor={colors.grey200}
                        maxLength={30}
                        onChangeText={(text) => setFullName(text)}
                        value={fullName}
                    />
                </View>
                <CustomText style={styles.h2} >Email:</CustomText>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        editable
                        placeholder={'Email'}
                        placeholderTextColor={colors.grey200}
                        maxLength={30}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <CustomText style={styles.h2} >Password:</CustomText>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        editable
                        placeholder={'Password'}
                        placeholderTextColor={colors.grey200}
                        maxLength={30}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <CustomText style={styles.h2} >Account Type:</CustomText>
                <View style={{flexDirection: 'row', gap: 15}}>
                    <Button
                        variant={type === 'Athlete' ? 'black' : 'white'}
                        title={'Athlete'}
                        style={{...styles.button, marginBottom: 10}}
                        onPress={() => setType('Athlete')}>
                    </Button>
                    <Button
                        variant={type === 'Coach' ? 'black' : 'white'}
                        title={'Coach'}
                        style={{...styles.button, marginBottom: 10}}
                        onPress={() => setType('Coach')}>
                    </Button>
                </View>
                <Button
                    variant='black'
                    title={'Create Account'}
                    style={{...styles.button, marginTop: 30, marginBottom: 10, width: 230}}
                    onPress={() => 
                    {fullName != '' && email != '' && password != '' && type != '' ? 
                    (type === 'Athlete' ? signUpAthlete() : signUpCoach()) 
                    : alert('Please input all fields')}}>
                </Button>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 150,
        height: 50,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h2: {
        color: colors.black,
        fontSize: 22,
        marginTop: 15,
        marginBottom: 2,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    inputs:{
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    inputText:{
        marginLeft: 15,
        color:colors.black
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 50,
        width: 320,
        justifyContent:"center",
    },
    logo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 60, 
        alignItems: 'center',
    },
});
