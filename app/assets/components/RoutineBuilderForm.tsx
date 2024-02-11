import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Button from './Buttons';


export default function RoutineBuilderForm() {
    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <Button style={styles.addButton} title='edit' variant='black' onPress={() => console.log('Add Skill')}></Button>
        </ScrollView>
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
        alignItems: 'center',
        height: 470,
        width: 350,
        marginTop: 190,
        marginBottom: 150,
    },
});