import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

import { H1Logo } from './Logo';
import { colors } from '../../config/theme';

export default function Header() {
    const navigation = useNavigation();

    const handleUserCirclePress = () => {
        navigation.navigate('Profile' as never);
    };

    const handleBellPress = () => {
        navigation.navigate('Notif Screen' as never);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleUserCirclePress}>
                <FontAwesome  
                    name='user-circle'
                    size={30} 
                    color={colors.black}
                />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
                <H1Logo></H1Logo>
            </View>
            <TouchableOpacity onPress={handleBellPress}>
                <FontAwesome  
                    name='bell'
                    size={30} 
                    color={colors.black}
                />
            </TouchableOpacity>
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