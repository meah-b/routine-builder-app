import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import EventButtons from '../assets/components/buttons/EventButtons';
import Button from '../assets/components/buttons/Buttons';

export default function RoutineLibrary() {
    const navigation = useNavigation();

    const handleAddRoutine = () => {
        navigation.navigate('Routine Builder' as never); 
    };

    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}
        >
            <Header />
            <CustomText style={styles.text} bold>
                Routine Library
            </CustomText>
            <EventButtons variant="four" />
            <Button
                style={styles.addButton}
                title="Add Routine"
                variant="black"
                onPress={handleAddRoutine}
            />
            <HomeButton />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        height: 35,
        width: 140,
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
