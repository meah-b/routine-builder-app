import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import RoutineCard from '../cards/RoutineCard';


export default function RoutineList() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <RoutineCard name='Routine 1' sv={13.6}></RoutineCard>
                <RoutineCard name='Routine 2' sv={13.6}></RoutineCard>
                <RoutineCard name='Routine 3' sv={13.6}></RoutineCard>
                <RoutineCard name='Routine 4' sv={13.6}></RoutineCard>
                <RoutineCard name='Routine 5' sv={13.6}></RoutineCard>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 160,
        height: 400,
        width: 370,
    },
    scrollContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
})