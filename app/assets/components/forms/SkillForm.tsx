import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { colors, CustomText } from "../../../config/theme";
import SkillDropDowns from "../utilities/SkillDropDowns";
import Button from "../buttons/Buttons";


interface SkillFormProps {
    event: string;
}

export default function SkillForm(props: SkillFormProps){
    const { event } = props;
    return (
        <View style={[styles.container, event === 'Vault' ? {height:400, marginBottom: 170,}: null]}>
            <CustomText style={styles.h1} bold>{event}</CustomText>
            <CustomText style={styles.text} bold>Skill Name:</CustomText>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                editable
                placeholder='Skill Name'
                placeholderTextColor={colors.grey200}
                maxLength={12}
                />
            </View>
            <SkillDropDowns variant={event}/>
            <Button
            onPress={console.log('save button pressed')}
            variant='black'
            title='Save'
            style={{width: 180, height: 50, marginTop: 15}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.fade1,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 80,
        height: 490,
        width: 370,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    h1: {
        color: colors.black,
        fontSize: 25,
        marginTop: 20,
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 60,
        width: 340,
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
        color:colors.black,
        fontSize: 16,
    },
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
})