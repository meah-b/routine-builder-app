import React from 'react';
import { StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/Header';
import HomeButton from '../assets/components/HomeButton';
import EventButtons from '../assets/components/EventButtons';
import Button from '../assets/components/Buttons';

export default function ConnectionLibrary() {
    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}>
            <Header></Header>
            <CustomText style={styles.text} bold>Connection Library</CustomText>
            <EventButtons variant='three'></EventButtons>
            <Button 
                style={styles.addButton} 
                title='Add Connection' 
                variant='black' 
                onPress={() => console.log('Add Connection')}>
            </Button>
            <HomeButton></HomeButton>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        height: 35,
        width: 160,
        top: 260,
        left: 20,
    },
    container: {
        flex: 1,
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
