import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Button from './buttons/Buttons';
import BuilderDropDowns from './buttons/BuilderDropDowns';

export default function RoutineBuilderForm() {
    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <BuilderDropDowns/>
            <Button
                title="Calculate Start Value"
                variant='black'
                style={styles.button}
                onPress={() => {}}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 50,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        height: 470,
        width: 370,
        paddingHorizontal: 5,
        marginTop: 190,
        marginBottom: 150,
    },
});