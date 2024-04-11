import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { firebase_auth, firestore_db, storage } from '../Firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


import { CustomText, colors } from '../config/theme';
import Button from '../assets/components/buttons/Buttons';

export default function Profile({navigation}) {
    const user_uid = firebase_auth.currentUser.uid;
    const userDocRef = doc(firestore_db, "users", user_uid);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [newName, setNewName] = useState('')
    const [newGym, setNewGym] = useState('')
    const [gym, setGym] = useState('')
    const [accountType, setAccountType] = useState('')
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingGym, setIsEditingGym] = useState(false)
    const [pfp, setPfp] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'You need to grant permission to access the photo library.');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets.length > 0) {
            const source = { uri: result.assets[0].uri };
            uploadImage(source);
        }
    };

    const uploadImage = async (source) => {
        const response = await fetch(source.uri);
        const blob = await response.blob();
        const filename = source.uri.substring(source.uri.lastIndexOf('/')+1);
        const storageRef = ref(storage, filename);
        try {
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            await setDoc(userDocRef, { profilePhoto: downloadURL }, { merge: true });
            fetchData()
        } catch (error) {
            console.log(error);
            Alert.alert('Error uploading photo');
        }
    }

    
    const fetchData = async () => {
        try {
            const userRef = doc(firestore_db, 'users', user_uid);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.data();
                if (userData && Object.keys(userData).length > 0) {
                    setName(userData.full_name);
                    setGym(userData.gym);
                    setEmail(userData.email);
                    setAccountType(userData.account_type)
                    setPfp(userData.profilePhoto)
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userDocRef]);

    function updateName(){
        setDoc(userDocRef, {full_name: newName},{merge:true});
    }
    
    function updateGym(){
        setDoc(userDocRef, {gym: newGym},{merge:true});
    }

    function resetPassword(){
        Alert.alert(`Password reset link has been sent to your email: ${email}`);
        sendPasswordResetEmail(firebase_auth, email)
    }

    const twoButtonAlert = () =>
        Alert.alert('Confirm', `Are you sure you want to sign out?`, 
        [{text: 'Cancel', style: 'cancel'},
        {text: "Sign out", onPress: ()=> firebase_auth.signOut()}]);

    return (
        <LinearGradient colors={colors.gradient2} style={styles.container}>
            <CustomText style={styles.h1} bold>Profile</CustomText>
            <AntDesign 
                    color={colors.black}
                    name="leftsquareo" 
                    size={35} 
                    style={styles.icon} 
                    onPress={() => navigation.goBack()}/>
            <View style={styles.card}>
                <View style={styles.inputs}>
                    <CustomText style={styles.text}>Name</CustomText>
                    <View style={styles.inputView}>
                        {isEditingName ? 
                        <TextInput
                        style={[styles.text3, { fontSize: 17, color: colors.black }]}
                        placeholder={name}
                        placeholderTextColor={colors.grey200}
                        textContentType='name'
                        maxLength={30}
                        onChangeText={(text) => setNewName(text)}
                        />
                        : <CustomText style={styles.text2}>{name}</CustomText>}
                        <AntDesign 
                        color={colors.black}
                        name={isEditingName ? "check" : "edit"} 
                        size={20}
                        style={{marginRight: 10}}
                        onPress={()=> (isEditingName ? [updateName(), setIsEditingName(false)] : setIsEditingName(true))}/>
                    </View>
                    <CustomText style={styles.text}>Gymnastics Club</CustomText>
                    <View style={styles.inputView}>
                        {isEditingGym ? 
                        <TextInput
                        style={[styles.text3, { fontSize: 17, color: colors.black }]}
                        placeholder={gym}
                        placeholderTextColor={colors.grey200}
                        maxLength={30}
                        onChangeText={(text) => setNewGym(text)}
                        /> 
                        : <CustomText style={styles.text2}>{gym}</CustomText>}
                        <AntDesign 
                        color={colors.black}
                        name={isEditingGym ? "check" : "edit"} 
                        size={20}
                        style={{marginRight: 10}}
                        onPress={()=> (isEditingGym ? [updateGym(), setIsEditingGym(false)] : setIsEditingGym(true))}/>
                    </View>
                    <CustomText style={styles.text}>Account Type</CustomText>
                    <View style={styles.inputView}>
                        <CustomText style={styles.text3}>{accountType}</CustomText>
                    </View>
                    <CustomText style={styles.text}>Email</CustomText>
                    <View style={styles.inputView}>
                        <CustomText style={styles.text3}>{email}</CustomText>
                    </View>
                </View>
                <TouchableOpacity onPress={()=> resetPassword()} style={{}}>
                        <CustomText bold style={{fontSize: 18, textDecorationLine:'underline', color: colors.black, marginBottom: 10}}>change password</CustomText>
                </TouchableOpacity>
                <Button
                    variant='black'
                    title='Sign Out'
                    style={styles.button}
                    onPress={() => twoButtonAlert()}>
                </Button>
            </View> 
            <View style={[styles.pfp, {backgroundColor: colors.purple200}]}>
                {pfp ? (
                <Image source={{ uri: pfp }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                ) : (
                <CustomText style={{ position: 'absolute', top: 40, left: 52, color: colors.white, fontSize: 55 }}>{Array.from(name)[0]}</CustomText>
                )}
            </View>
            <TouchableOpacity style={styles.editpfp} onPress={pickImage}>
                    <AntDesign
                        color={colors.white}
                        name="upload"
                        size={20}
                        style={{ marginRight: 1, marginBottom: 1 }}
                    />
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 230,
        height: 50,
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
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editpfp: {
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: colors.black,
        position: 'absolute',
        top: 275,
        left: 225,
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 90
    },
    inputs:{
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        borderColor: colors.black,
        borderWidth: 1,
        height: 40,
        width: 320,
        justifyContent:"space-between",
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        position: 'absolute',
        top: 95,
        left: 30,
    },
    pfp: {
        height: 150,
        width: 150,
        borderRadius: 100,
        overflow: 'hidden',
        position: 'absolute',
        top: 165
    },
    text: {
        color: colors.grey300,
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 10,
    },
    text2: {
        color: colors.black,
        fontSize: 18,
        alignSelf: 'center',
        marginLeft: 10,
    },
    text3: {
        color: colors.grey300,
        fontSize: 18,
        alignSelf: 'center',
        marginLeft: 10,
    },
    textBox: {
        flexDirection: 'column',
        marginBottom: 50
    }
});

