import React from 'react';
import { Alert, Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Logo } from '../assets/components/utilities/Logo';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import Button from '../assets/components/buttons/Buttons';

export default function Menu({navigation}) {
    const [form, setForm] = React.useState('Menu')

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

    function DefaultMenu(){
        return(
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
                    <TouchableOpacity style={styles.row} onPress={() => setForm('Feedback')}>
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
        )
    }

    function FeedbackMenu(){
        const [feedback, setFeedback] = React.useState('')

        return(
            <View onTouchStart={()=>Keyboard.dismiss()} style={styles.card2}>
                <View style={styles.box2}>
                    <TouchableOpacity onPress={() => setForm('Menu')} style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 20, marginRight: 280}}>
                        <AntDesign 
                        color={colors.purple}
                        name="left" 
                        size={25}/>
                        <CustomText style={{color: colors.purple, fontSize: 22}}>back</CustomText>
                    </TouchableOpacity>
                    <CustomText style={styles.text}>Submit your feedback for the creator:</CustomText>
                    <View style={styles.inputView}>
                        <TextInput
                        style={styles.textInput}
                        placeholder={'Type here...'}
                        placeholderTextColor={colors.grey200}
                        editable
                        multiline
                        maxLength={400}
                        onChangeText={(text) => setFeedback(text)}
                        value={feedback}/>
                    </View>
                    <Button
                        variant='black'
                        title='Submit'
                        onPress={()=>{}}
                        style={styles.button}/>
                </View>
            </View>
        )
    }

    return (
        <LinearGradient colors={colors.gradient2} style={styles.container}>
            {form === 'Menu' && <View style={styles.logoContainer}>
                <Logo/>
            </View>}
            <AntDesign 
                    color={colors.black}
                    name="menufold" 
                    size={35} 
                    style={styles.icon} 
                    onPress={() => navigation.goBack()}/>
            {form === 'Menu' ? <DefaultMenu/> : <FeedbackMenu/>}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 50,
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 130,
    },
    box2: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
        position: 'absolute',
        top: 20
    },
    button: {
        height: 50,
        width: 130,
    },
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
    card2: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        height: 650,
        marginTop: 200,
        width: '100%',
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
    inputView: {
        backgroundColor: colors.white,
        borderRadius:15,
        height: 180,
        width: 340,
        justifyContent:'flex-start',
        marginVertical: 5,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    textInput: {
        padding: 10,
        marginTop: 5,
        fontSize: 18,
        color: colors.black,
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
});
