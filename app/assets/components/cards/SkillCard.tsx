import React from 'react';
import { View, StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import {colors, CustomText} from '../../../config/theme';


export default function SkillCard({
    name,
    difficulty,
    category,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.col}>
                <CustomText style={styles.name} bold>{name}</CustomText>
            <CustomText style={styles.difficulty}>Difficulty Value: {difficulty}</CustomText>
            </View>
            <View style={styles.col}>
                <AntDesign 
                    color="black" 
                    name="delete" 
                    size={24}  
                    style={styles.icon}
                />
                <CustomText style={styles.category}>{category}</CustomText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    category: {
        fontSize: 20,
    },
    col: {
        flexDirection: 'column',
        gap: 4
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        color: colors.black,
        width: 350,
        height: 80,
        paddingHorizontal: 15,
        margin: 4,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    difficulty: {
        fontSize: 20
    },
    icon: {
        marginLeft: 15,
        marginTop: 5
    },
    name: {
        fontSize: 20
    }
});