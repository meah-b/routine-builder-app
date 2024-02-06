import React from 'react';
import { StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import SectionCard from '../assets/components/SectionCard';
import Header from '../assets/components/Header';

export default function HomeScreen({navigation}) {
    return (
        <LinearGradient
            colors={colors.gradient}
            style={styles.container}>
            <Header></Header>
            <View style={{marginTop: 90}}>
                <SectionCard variant="Skills" navigation></SectionCard>
                <SectionCard variant="Connections" navigation></SectionCard>
                <SectionCard variant="Routines" navigation></SectionCard>
                <SectionCard variant="Builder" navigation></SectionCard>
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
