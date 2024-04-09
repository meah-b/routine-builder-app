import React from 'react';
import { View, StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import {colors, CustomText} from '../../../config/theme';

interface Props {
    name: string;
    difficulty: string;
    cv: string;
    dv: string;
    handleDelete: () => void;
}

export default function ConnectionCard(props: Props) {
    const { name, difficulty, cv, dv, handleDelete } = props;
    return (
        <View style={styles.container}>
            <View style={styles.col}>
                <CustomText style={styles.text} bold>{name}</CustomText>
                <CustomText style={styles.text}>{cv}</CustomText>
                <CustomText style={styles.text}>{difficulty}</CustomText>
                <CustomText style={styles.text}>{dv}</CustomText>
            </View>
            <AntDesign 
                color="black" 
                name="delete" 
                size={24}  
                style={styles.icon}
                onPress={handleDelete}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    col: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        color: colors.black,
        width: 350,
        height: 130,
        paddingHorizontal: 15,
        marginVertical: 4,
        marginHorizontal: 10,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        marginLeft: 15,
        marginTop: 5
    },
    text: {
        fontSize: 20
    }
});