import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Logo } from '../assets/components/utilities/Logo';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

export default function Menu({navigation}) {

    const signOutAlert = () =>
        Alert.alert('Confirm', `Are you sure you want to sign out?`, 
        [{text: 'Cancel', style: 'cancel'},
        {text: "Sign out", onPress: ()=> firebase_auth.signOut()}]);

    const deleteAlert = () =>
        Alert.alert('Confirm', `Are you sure you want to delete your account?`, 
        [{text: 'Cancel', style: 'cancel'},
        {text: "Delete", onPress: ()=> deleteAccount()}]);

    const deleteAccount = async () => {
        const user_uid = firebase_auth.currentUser.uid;
        const userDocRef = doc(firestore_db, "users", user_uid);
        await deleteDoc(userDocRef)
        await firebase_auth.signOut()
    }

    return (
        <LinearGradient colors={colors.gradient2} style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo/>
            </View>
            <AntDesign 
                    color={colors.black}
                    name="menufold" 
                    size={35} 
                    style={styles.icon} 
                    onPress={() => navigation.goBack()}/>
            <View style={styles.card}>
                <View style={styles.box}>
                    <TouchableOpacity style={styles.row}>
                        <AntDesign 
                        color={colors.purple}
                        name="export" 
                        size={25}/>
                        <CustomText style={styles.text}>Export Roster</CustomText>
                        <AntDesign 
                        color={colors.purple}
                        name="right" 
                        size={25}
                        style={{marginLeft: 100}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <AntDesign 
                        color={colors.purple}
                        name="filetext1" 
                        size={25}/>
                        <CustomText style={styles.text}>Submit Feedback</CustomText>
                        <AntDesign 
                        color={colors.purple}
                        name="right" 
                        size={25}
                        style={{marginLeft: 63}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => deleteAlert()}>
                        <AntDesign 
                        color={colors.purple}
                        name="deleteuser" 
                        size={25}/>
                        <CustomText style={styles.text}>Delete Account</CustomText>
                        <AntDesign 
                        color={colors.purple}
                        name="right" 
                        size={25}
                        style={{marginLeft: 80}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => signOutAlert()}>
                        <AntDesign 
                        color={colors.purple}
                        name="logout" 
                        size={25}/>
                        <CustomText style={styles.text}>Sign Out</CustomText>
                        <AntDesign 
                        color={colors.purple}
                        name="right" 
                        size={25}
                        style={{marginLeft: 140}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        height: 500,
        width: '100%',
        bottom: 0,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        top: 95,
        left: 30,
    },
    logoContainer: {
        position: 'absolute',
        top: 150,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 320
    },
    text: {
        fontSize: 22,
        color: colors.black
    },
    box: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 50,
        alignItems: 'flex-start',
        paddingTop: 30,
        paddingBottom: 100,
    }
});
