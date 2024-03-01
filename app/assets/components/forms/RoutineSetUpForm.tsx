import React from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';

import EventButtons from '../buttons/EventButtons';
import LevelButtons from '../buttons/LevelButtons';
import {colors, CustomText} from '../../../config/theme';


export default function RoutineSetUpForm() {
    return (
        <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
            <CustomText style={styles.text} bold>Routine Name:</CustomText>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                editable
                placeholder='Routine Name'
                placeholderTextColor={colors.grey200}
                maxLength={12}
                />
            </View>
            <CustomText style={styles.text} bold>Event:</CustomText>
            <View style={styles.eventButtons}>
                <EventButtons variant="build" selectedVariant onPress1 onPress2 onPress3 onPress4/>  
            </View>
            <CustomText style={styles.text} bold>Level:</CustomText>
            <LevelButtons />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: colors.fade1,
        height: 470,
        width: 350,
        marginTop: 190,
        marginBottom: 150,
    },
    eventButtons: {
        alignItems: 'center',
        marginVertical: 5,
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 50,
        width: 310,
        justifyContent:"center",
        marginVertical: 5,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    inputText:{
        marginLeft: 20,
        color:colors.black
    },
    text: {
        color: colors.black,
        fontSize: 20,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    
});