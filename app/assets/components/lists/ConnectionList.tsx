import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import ConnectionCard from '../cards/ConnectionCard';


export default function ConnectionList() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ConnectionCard name='Front Ariel - Switch 1/2' difficulty='D-D' category='Acro-Dance' cv='0.2'></ConnectionCard>
                <ConnectionCard name='Front Ariel - Switch 1/2' difficulty='D-D' category='Acro-Dance' cv='0.2'></ConnectionCard>
                <ConnectionCard name='Front Ariel - Switch 1/2' difficulty='D-D' category='Acro-Dance' cv='0.2'></ConnectionCard>
                <ConnectionCard name='Front Ariel - Switch 1/2' difficulty='D-D' category='Acro-Dance' cv='0.2'></ConnectionCard>
                <ConnectionCard name='Front Ariel - Switch 1/2' difficulty='D-D' category='Acro-Dance' cv='0.2'></ConnectionCard>
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