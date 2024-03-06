import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
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
    const [isEmpty, setIsEmpty] = useState(true)
    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    const [role, setRole] = useState('')
    const [favouriteEvent, setFavouriteEvent] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRef = doc(firestore_db, 'users', user_uid);
                const snapshot = await getDoc(userRef);

                if (snapshot.exists()) {
                    setIsEmpty(false);
                } else {
                    setIsEmpty(true);
                }
                console.log(isEmpty)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function addProfile(){
        setDoc(doc(userDocRef, user_uid), {
            full_name: name,
            level: level,
            role: role,
            fav_event: favouriteEvent
        },{merge:true});
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    const twoButtonAlert = () =>
        Alert.alert('Confirm', `Are you sure you want to sign out?`, [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: "Sign out", 
            onPress: () => firebase_auth.signOut()},
    ]);

    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            <CustomText style={styles.h1} bold>Edit Profile</CustomText>
            <AntDesign 
                    color="black" 
                    name="leftsquareo" 
                    size={35} 
                    style={styles.icon} 
                    onPress={handleBackPress}/>
            <View style={styles.card}>
                <View style={styles.inputs}>
                    <CustomText style={styles.text2} bold>Name:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder='Simone Biles'
                            placeholderTextColor={colors.grey200}
                            maxLength={30}
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                    </View>
                    <CustomText style={styles.text2} bold>Level:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder='9'
                            placeholderTextColor={colors.grey200}
                            maxLength={30}
                            onChangeText={(text) => setLevel(text)}
                            value={level}
                        />
                    </View>
                    <CustomText style={styles.text2} bold>Role:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder='Athlete'
                            placeholderTextColor={colors.grey200}
                            maxLength={30}
                            onChangeText={(text) => setRole(text)}
                            value={role}
                        />
                    </View>
                    <CustomText style={styles.text2} bold>Favourite Event:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            editable
                            placeholder='Bars'
                            placeholderTextColor={colors.grey200}
                            maxLength={30}
                            onChangeText={(text) => setFavouriteEvent(text)}
                            value={favouriteEvent}
                        />
                    </View>
                    <Button
                        variant='black'
                        title='Update'
                        style={styles.button}
                        onPress={() => twoButtonAlert()}>
                    </Button>
                </View>
                {/* <Button
                    variant='black'
                    title='Sign Out'
                    style={styles.button}
                    onPress={() => twoButtonAlert()}>
                </Button>       */}
            </View> 
            <Svg>
                <Circle
                cx="50%"
                cy="248.5"
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
        width: 150,
        height: 50,
        marginTop: 20,
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
    circle: {
        position: 'absolute',
        bottom: 520,
        height: 150,
        borderRadius: 75, 
        borderWidth: 2, 
        borderColor: 'darkpurple', 
        backgroundColor: colors.white
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
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 90,
    },
    inputs:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 70,
    },
    inputText:{
        marginLeft: 20,
        color:colors.black
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        borderColor: colors.black,
        borderWidth: 1,
        height: 50,
        width: 330,
        justifyContent:"center",
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        position: 'absolute',
        top: 95,
        left: 30,
    },
    pfp: {
        position: 'absolute',
        bottom: 520,
        height: 150,
        objectFit: 'contain'
    },
    text: {
        color: colors.black,
        fontSize: 30,
    },
    text2: {
        color: colors.black,
        fontSize: 20,
        marginTop: 10,
        alignSelf: 'flex-start',
        marginLeft: 35,
        marginBottom: 5,
    },
});

