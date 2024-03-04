import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Button from '../buttons/Buttons';
import BuilderDropDowns from '../utilities/BuilderDropDowns';

interface Props{
    routine_id: string;
    event: string;
}

export default function RoutineBuilderForm(props: Props) {
    const {routine_id, event} = props;
    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <BuilderDropDowns event={event} routine_id={routine_id}/>
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