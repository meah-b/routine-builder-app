import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {LinearGradient} from 'expo-linear-gradient';
import { Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

import { CustomText, colors } from '../config/theme';
import Button from '../assets/components/buttons/Buttons';

export default function Profile() {
    const navigation = useNavigation();
    const user_uid = firebase_auth.currentUser.uid;
    const userDocRef = doc(firestore_db, "users", user_uid);
    const [isEmpty, setIsEmpty] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    const [goal, setGoal] = useState('')
    const [favouriteEvent, setFavouriteEvent] = useState('')
    const [gym, setGym] = useState('')
 
    const fetchData = async () => {
        try {
            const userRef = doc(firestore_db, 'users', user_uid);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.data();
                if (userData && Object.keys(userData).length > 0) {
                    setName(userData.full_name || '');
                    setLevel(userData.level || '');
                    setGoal(userData.goal || '');
                    setFavouriteEvent(userData.fav_event || '');
                    setGym(userData.gym || '');
                } else {
                    setIsEmpty(true);
                }
            } else {
                setIsEmpty(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isEditing]);
    
    function updateProfile(add_name, add_level, add_goal, add_favouriteEvent, add_gym){
        setDoc(userDocRef, {
            full_name: add_name ? add_name : name,
            level: add_level ? add_level : level,
            goal: add_goal ? add_goal : goal,
            fav_event: add_favouriteEvent ? add_favouriteEvent : favouriteEvent,
            gym: add_gym ? add_gym : gym,
        },{merge:true});
        setIsEditing(false);
        fetchData();
        setIsEmpty(false);
    }

    const twoButtonAlert = () =>
        Alert.alert('Confirm', `Are you sure you want to sign out?`, 
        [{text: 'Cancel', style: 'cancel'},
        {text: "Sign out", onPress: () => firebase_auth.signOut()}]);

    function CreateProfile(){
        const [newName, setNewName] = useState(name)
        const [newLevel, setNewLevel] = useState(level)
        const [newGoal, setNewGoal] = useState(goal)
        const [newFavouriteEvent, setNewFavouriteEvent] = useState(favouriteEvent)
        const [newGym, setNewGym] = useState(gym)

        return (
            <KeyboardAwareScrollView>
                <View style={styles.inputs}>
                    <CustomText style={styles.text2} bold>Name:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder={name === '' ? 'Simone Biles' : name}
                            placeholderTextColor={colors.grey200}
                            maxLength={30}
                            onChangeText={(text) => setNewName(text)}
                            value={newName}
                        />
                    </View>
                    <CustomText style={styles.text2} bold>Level:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder={level === '' ? '9' : level}
                            placeholderTextColor={colors.grey200}
                            maxLength={10}
                            onChangeText={(text) => setNewLevel(text)}
                            value={newLevel}
                        />
                    </View>
                    <CustomText style={styles.text2} bold>Goal:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder={goal === '' ? 'Olympics' : goal}
                            placeholderTextColor={colors.grey200}
                            maxLength={30}
                            onChangeText={(text) => setNewGoal(text)}
                            value={newGoal}
                        />
                    </View>
                    <CustomText style={styles.text2} bold>Favourite Event:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder={favouriteEvent === '' ? 'Bars' : favouriteEvent}
                            placeholderTextColor={colors.grey200}
                            maxLength={5}
                            onChangeText={(text) => setNewFavouriteEvent(text)}
                            value={newFavouriteEvent}
                        />
                    </View>
                    <CustomText style={styles.text2} bold>Gym Name:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder={gym === '' ? 'WOGA' : gym}
                            placeholderTextColor={colors.grey200}
                            maxLength={30}
                            onChangeText={(text) => setNewGym(text)}
                            value={newGym}
                        />
                    </View>
                    <Button
                        variant='black'
                        title={isEmpty ? 'Create Profile' : 'Update'}
                        style={{...styles.button, marginTop: 15, marginBottom: 30}}
                        onPress={() => updateProfile(newName, newLevel, newGoal, newFavouriteEvent, newGym)}>
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    function Profile(){
        return (
            <View style={styles.profile}>
                    <View style={styles.textBox}>
                        <CustomText style={styles.name} bold>{name}</CustomText>
                        <CustomText style={styles.text3} bold>Level</CustomText>
                        <CustomText style={styles.text3}>{level}</CustomText>
                        <CustomText style={styles.text3} bold>Favourite Event</CustomText>
                        <CustomText style={styles.text3}>{favouriteEvent}</CustomText>
                        <CustomText style={styles.text3} bold>Goal</CustomText>
                        <CustomText style={styles.text3}>{goal}</CustomText>
                        <CustomText style={styles.text3} bold>Gym</CustomText>
                        <CustomText style={styles.text3}>{gym}</CustomText>
                    </View>
                    <Button
                        variant='black'
                        title='Edit Profile'
                        style={styles.button}
                        onPress={() => setIsEditing(true)}>
                    </Button>
                    <Button
                        variant='white'
                        title='Sign Out'
                        style={{...styles.button, borderWidth: 1}}
                        onPress={() => twoButtonAlert()}>
                    </Button>
            </View>
        )
    }

    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            <CustomText style={styles.h1} bold>{isEmpty ? 'Create Profile' : isEditing ? 'Edit Profile' : 'Profile'}</CustomText>
            <AntDesign 
                    color={colors.white}
                    name="leftsquareo" 
                    size={35} 
                    style={styles.icon} 
                    onPress={() => navigation.goBack()}/>
            <View style={styles.card}>
                {isEditing || isEmpty ? <CreateProfile/>:<Profile/>}
            </View> 
            <Svg height={160} width={158} style={{bottom: 188}}>
                <Circle
                cx="50%"
                cy="79"
                r="76"
                stroke={colors.purple}
                strokeWidth="5"
                fill={colors.white}
                />
            </Svg>
            <Image source={require('../assets/images/default_pfp.png')} style={styles.pfp}></Image>  
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 50,
    },
    buttons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        height: 600,
        width: '100%',
        bottom: 0,
    },
    createButton: {
        width: 200,
        height: 50,
        marginVertical: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        color: colors.white,
        fontSize: 30,
        position: 'absolute',
        top: 90
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
        borderColor: colors.black,
        borderWidth: 1,
        height: 40,
        width: 320,
        justifyContent:"center",
    },
    icon: {
        position: 'absolute',
        top: 95,
        left: 30,
    },
    name: {
        color: colors.black,
        fontSize: 30,
        marginVertical: 10
    },
    profile: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
    },
    pfp: {
        height: 150,
        objectFit: 'contain',
        position: 'absolute',
        top: 158
    },
    text: {
        color: colors.black,
        fontSize: 30,
    },
    text2: {
        color: colors.black,
        fontSize: 18,
        marginTop: 10,
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginBottom: 5,
    },
    text3: {
        color: colors.black,
        fontSize: 18,
        alignSelf: 'center',
        marginBottom: 2,
    },
    textBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    }
});

