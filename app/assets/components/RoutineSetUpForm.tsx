import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import EventButtons from './EventButtons';
import Button from './Buttons';
import {colors, CustomText} from '../../config/theme';


export default function RoutineSetUpForm() {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text} bold>Event:</CustomText>
            <View style={styles.eventButtons}>
               <EventButtons variant="build" />  
            </View>
            <CustomText style={[styles.text, {marginTop:100}]} bold>Level:</CustomText>
            <View style={styles.levels}>
                <Button title= '6' variant="white" style={styles.levelButtons} onPress />
                <Button title= '7' variant="white" style={styles.levelButtons} onPress />
                <Button title= '8' variant="white" style={styles.levelButtons} onPress />
                <Button title= '9' variant="white" style={styles.levelButtons} onPress />
                <Button title= '10' variant="white" style={styles.levelButtons} onPress />
            </View>
            <View style={styles.secondLevels}>
                <Button title= 'Novice' variant="white" style={styles.secondLevelButtons} onPress />
                <Button title= 'Junior' variant="white" style={styles.secondLevelButtons} onPress />
                <Button title= 'Senior' variant="white" style={styles.secondLevelButtons} onPress />
            </View>
            <CustomText style={[styles.text, {marginTop:270}]} bold>Routine Name:</CustomText>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                editable
                placeholder='Routine Name'
                placeholderTextColor={colors.grey200}
                maxLength={12}
                />
            </View>
            <Button title= 'Start Building' variant="black" style={{width: 200, height: 50, top: 220}} onPress />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: colors.fade1,
        height: 470,
        width: 340,
        position: 'absolute',
        bottom: 170,
    },
    eventButtons: {
        flexDirection: 'column',
        alignItems: 'center',
        bottom: 150,
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 50,
        width: 310,
        justifyContent:"center",
        top: 200,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    inputText:{
        position: 'absolute',
        left: 20,
        color:colors.black
    },
    levelButtons: {
        height: 50,
        width: 55,
        marginHorizontal: 4,
    },
    levels: {
        flexDirection: 'row',
        top: 145,
    },
    secondLevels: {
        flexDirection: 'row',
        top: 150,
    },
    secondLevelButtons: {
        height: 50,
        width: 95,
        marginHorizontal: 6,
    },
    text: {
        color: colors.black,
        fontSize: 20,
        position: 'absolute',
        top: 10,
        left: 20,
    },
});