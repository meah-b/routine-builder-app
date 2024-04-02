import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/utilities/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import Button from '../assets/components/buttons/Buttons';
import AthleteForm from '../assets/components/forms/AthleteForm';
import CoachesRoster from '../assets/components/lists/CoachesRoster';

export default function RosterScreen() {
    const [form, setForm] = useState(0);

    function Form(){
        if (form === 0){
            return (
                <View style={styles.container}>
                    <Header></Header>
                    <CustomText style={styles.h1} bold>Roster</CustomText>
                    <Button 
                        style={styles.addButton} 
                        title='Add Athlete' 
                        variant='black' 
                        onPress={() => setForm(1)}>
                    </Button>
                    <CoachesRoster/>
                </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Header></Header>
                    <TouchableOpacity onPress={() => setForm(0)} style={{position: 'absolute', top: 160, left: -180}}>
                        <CustomText 
                            style={styles.text} 
                            bold
                        >back to roster
                        </CustomText>
                    </TouchableOpacity>
                    <AthleteForm onSubmit={() => setForm(0)}/> 
                </View>
            )
        }
    }
    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            <Form/>
            <HomeButton></HomeButton>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        height: 35,
        width: 165,
        top: 200,
        left: 10,
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
        top: 130,
    },
    text: {
        fontSize: 18, 
        textDecorationLine:'underline', 
        color: colors.black,
    }
});
