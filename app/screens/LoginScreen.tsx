import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

import {CustomText, colors} from '../config/theme';
import {GradientSvg1, GradientSvg2} from '../assets/components/utilities/Gradients';
import {Logo} from '../assets/components/utilities/Logo';
import Button from '../assets/components/buttons/Buttons';
import TxtInput from '../assets/components/utilities/TextInput';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = firebase_auth;

    const signIn = async () => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false)
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;
            const userDocRef = doc(firestore_db, "users", user.uid);
            const eventsRef = collection(userDocRef, "events");

            await setDoc(doc(eventsRef, "vault"), {});  
            await setDoc(doc(eventsRef, "bars"), {});
            await setDoc(doc(eventsRef, "beam"), {});
            await setDoc(doc(eventsRef, "floor"), {});
    
        } catch (error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <View style={styles.gradient1}><GradientSvg1/></View>
            <View style={styles.gradient2}><GradientSvg2/></View>
            <View style={styles.logo}><Logo/></View>
            <View style={styles.loginContainer}>
                <TxtInput 
                variant={"email"} 
                onChange={(text) => setEmail(text)}
                value={email}/>
                <TxtInput 
                variant={"password"} 
                onChange={(text) => setPassword(text)}
                value={password}/>
            </View>
            <View style={styles.loginButtonContainer}>
                { loading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
                ) : ( <>
                <Button
                    onPress={signIn}
                    variant='black'
                    title='Login'
                    style={{width:140}}
                />
                <Button
                    onPress={signUp}
                    variant='black'
                    title='Sign Up'
                    style={{width:140}}
                /></>)}
            </View>
            <View style={styles.alternateContainer}>
                <View style={styles.row}>
                    <View style={styles.line}></View>
                    <CustomText style={{fontSize:14}}bold>or sign in with</CustomText>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity style={styles.tempInputView}>
                    <AntIcon style={{left:20}} 
                        name={'google'}
                        size={20} 
                    />
                    <CustomText style={{left:60, position: 'absolute', fontSize: 16}}bold>Continue with Google</CustomText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    alternateContainer: {
        position: 'absolute',
        top: 680,
        flexDirection: "column", 
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient1: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0, 
        right: 0,
        left: 0,
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    gradient2: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0, 
        right: 0,
        left: 0,
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black', 
        marginHorizontal: 10,
    },
    loginButtonContainer: {
        flexDirection: "row",
        alignItems: 'center',
        position: 'absolute',
        top: 450,
        gap: 5,
    },
    loginContainer: {
        position: 'absolute',
        top: 320,
        flexDirection: "column",
        alignItems: 'center',
    },
    logo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 120, 
        alignItems: 'center',
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    tempInputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 50,
        width: 285,
        marginVertical: 20,
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
});

