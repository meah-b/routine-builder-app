import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import {BlackText, colors} from '../config/theme';
import {GradientSvg1, GradientSvg2} from '../assets/components/Gradients';
import Logo from '../assets/components/Logo';
import {BlackButton} from '../assets/components/Buttons';


function LoginScreen() {
    return (
        <View>
            <View style={styles.shadow}>
                <GradientSvg1 />
            </View>
            <View style={styles.gradient}>
                <GradientSvg2 />
            </View>
            <View style={styles.logo}>
                <Logo />
            </View>
            <View style={styles.buttonContainer}>
                <BlackButton
                    title="Login"
                    onPress={console.log('button 1 pressed')}
                />
                <TouchableOpacity>
                    <BlackText style={{fontSize:14, textDecorationLine:'underline'}} onPress={console.log('button 2 pressed')}>forgot password</BlackText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 300,  
        left: 0,   
        right: 0,   
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    logo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '20%', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
});

export default LoginScreen;
