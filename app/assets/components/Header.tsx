import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { H1Logo } from './Logo';
import {colors} from '../../config/theme';

export default function Header() {
    return (
        <View style={styles.container}>
            <FontAwesome  
            name='user-circle'
            size={30} 
            color={colors.black}/>
            <View style={styles.logoContainer}>
                <H1Logo></H1Logo>
            </View>
            <FontAwesome  
            name='bell'
            size={30} 
            color={colors.black}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 40,
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginHorizontal: 85,
    },
});