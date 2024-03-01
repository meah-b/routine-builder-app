import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import Button from '../assets/components/buttons/Buttons';
import Header from '../assets/components/utilities/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import RoutineSetUpForm from '../assets/components/forms/RoutineSetUpForm';
import RoutineBuilderForm from '../assets/components/forms/RoutineBuilderForm';

export default function RoutineBuilder() {
    const [isBuilding, setIsBuilding] = useState(false);

    const startBuilding = () => {
        setIsBuilding(true);
    };

    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}>
            <Header></Header>
            <CustomText style={styles.text} bold>Routine Builder</CustomText>
            {isBuilding ? <RoutineBuilderForm /> : <RoutineSetUpForm />}
            {!isBuilding && <Button title= 'Start Building' variant="black" style={styles.startButton} onPress={startBuilding} />}
            <HomeButton></HomeButton>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButton: {
        width: 200,
        height: 50,
        position: 'absolute',
        bottom: 170,
    },
    text: {
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 130,
    },
});