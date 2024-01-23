import React from 'react';
import { View, StyleSheet } from 'react-native';

import {colors, CustomText} from '../config/theme';
import GradientSvg1 from '../assets/LoginGradient1';
import GradientSvg2 from '../assets/LoginGradient2';
import LoginButton1 from '../assets/UserLoginButton';
import LoginButton2 from '../assets/PassLoginButton';


function LoginScreen() {
    return (
        <View>
            <View style={styles.shadow}>
                <GradientSvg1 />
            </View>
            <View style={styles.gradient}>
                <GradientSvg2 />
            </View>
            <CustomText style={styles.h1}>Login</CustomText>
            <View style={styles.button}>
                <LoginButton1 onPress={() => console.log('Login button 1 pressed')} />
                <LoginButton2 onPress={() => console.log('Login button 2 pressed')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    button: {
        position: 'absolute',
        top: 300,  
        left: 0,   
        right: 0,   
        alignItems: 'center',
    },
    h1: {
        position: 'absolute',
        fontSize: 40,
        color: colors.white,
        textAlign: 'center', 
        left: 0,
        right: 0,
        top: 150,
    }
});

export default LoginScreen;
