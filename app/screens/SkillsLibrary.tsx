import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/utilities/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import EventButtons from '../assets/components/buttons/EventButtons';
import Button from '../assets/components/buttons/Buttons';
import SkillForm from '../assets/components/forms/SkillForm';
import SkillList from '../assets/components/lists/SkillList';

export default function SkillLibrary() {
    const [form, setForm] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('Vault');

    function Form(){
        if (form === 0){
            return (
                <View style={styles.container}>
                    <Header></Header>
                    <CustomText style={styles.h1} bold>Skill Library</CustomText>
                    <EventButtons 
                    variant='four' 
                    selectedVariant={selectedVariant}
                    onPress1={() => setSelectedVariant('Vault')} 
                    onPress2={() => setSelectedVariant('Bars')} 
                    onPress3={() => setSelectedVariant('Beam')} 
                    onPress4={() => setSelectedVariant('Floor')}>
                    </EventButtons>
                    <Button
                        style={styles.addButton}
                        title='Add Skill'
                        variant='black'
                        onPress={() => setForm(1)}
                    ></Button>
                    <SkillList event={selectedVariant} order={null}></SkillList>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Header></Header>
                    <TouchableOpacity onPress={() => setForm(0)} style={{position: 'absolute', top: 160, left: -80}}>
                        <CustomText 
                            style={styles.text} 
                            bold
                        >back to skills library
                        </CustomText>
                    </TouchableOpacity>
                    <SkillForm event={selectedVariant} onSubmit={() => setForm(0)}/> 
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
        width: 110,
        top: 250,
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
        right: 100,
        textDecorationLine:'underline', 
        color: colors.black,
    }
});
