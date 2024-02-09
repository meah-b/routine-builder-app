import React from 'react';
import { StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/Header';
import HomeButton from '../assets/components/HomeButton';
import EventButtons from '../assets/components/EventButtons';
import Button from '../assets/components/Buttons';

export default function SkillLibrary() {
    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}>
            <Header></Header>
            <CustomText style={styles.text} bold>Skill Library</CustomText>
            <EventButtons variant='four'></EventButtons>
            <Button style={styles.addButton} title='Add Skill' variant='black' onPress={() => console.log('Add Skill')}></Button>
            <HomeButton></HomeButton>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        height: 35,
        width: 110,
        top: 260,
        left: 20,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 130,
    },
});
