import React from 'react';
import { StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { colors } from '../config/theme';
import SectionCard from '../assets/components/cards/SectionCard';
import Header from '../assets/components/utilities/Header';

export default function HomeScreen() {
    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}>
            <Header></Header>
            <View style={{marginTop: 90}}>
                <SectionCard variant="Skills" page='Skill Library'></SectionCard>
                <SectionCard variant="Connections" page='Connection Library'></SectionCard>
                <SectionCard variant="Routines" page='Routine Library'></SectionCard>
                <SectionCard variant="Builder" page='Routine Builder'></SectionCard>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
