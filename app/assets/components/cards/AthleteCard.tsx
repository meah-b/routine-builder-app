import React from 'react';
import { View, StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import {colors, CustomText} from '../../../config/theme';

interface Props {
    name: string;
    level: string;
    handleDelete: () => void;
}

export default function AthleteCard(props: Props) {
    const {name, level, handleDelete} = props;
    return (
        <View style={styles.container}>
            <View style={styles.col}>
                <CustomText style={styles.name} bold>{name}</CustomText>
            <CustomText style={styles.difficulty}>Level: {level}</CustomText>
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
    category: {
        fontSize: 20,
        position: 'absolute',
        top: 2,
        right: 0
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
        position: 'absolute',
        bottom: 25,
        right: 15
    },
    name: {
        fontSize: 20
    }
});