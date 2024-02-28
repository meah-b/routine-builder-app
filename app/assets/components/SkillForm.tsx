import React from "react";
import { View, StyleSheet } from "react-native";

import { colors, CustomText } from "../../config/theme";
import TxtInput from './TextInput';


interface SkillFormProps {
    event: string;
}

export default function SkillForm(props: SkillFormProps){
    const { event } = props;
    return (
        <View style={styles.container}>
            <CustomText style={styles.h1} bold>{event}</CustomText>
            <CustomText style={styles.text} bold>Skill Name:</CustomText>
            <TxtInput variant={"skill"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.fade1,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 100,
        height: 450,
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
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 20,
    },
})