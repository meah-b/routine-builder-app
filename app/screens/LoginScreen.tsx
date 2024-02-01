import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import {CustomText, colors} from '../config/theme';
import {GradientSvg1, GradientSvg2} from '../assets/components/Gradients';
import Logo from '../assets/components/Logo';
import Button from '../assets/components/Buttons';
import TxtInput from '../assets/components/TextInput';


function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.gradient1}><GradientSvg1/></View>
            <View style={styles.gradient2}><GradientSvg2/></View>
            <View style={styles.logo}><Logo/></View>
            <View style={styles.loginContainer}>
                <TxtInput variant={"username"}/>
                <TxtInput variant={"password"}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={console.log('button 1 pressed')}
                    variant='login'
                    title='Login'
                />
                <TouchableOpacity>
                    <CustomText 
                        style={{fontSize:14, textDecorationLine:'underline'}} 
                        onPress={console.log('button 2 pressed')}>forgot password
                    </CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.alternateContainer}>
                <View style={styles.line}></View>
                <CustomText style={{fontSize:14}}>or sign in with</CustomText>
                <View style={styles.line}></View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    alternateContainer: {
        position: 'absolute',
        bottom: 190,
        flexDirection: "row", 
        alignItems: 'center',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: 15,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        },
    gradient1: {
        position: 'absolute',
        top: 0, 
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    gradient2: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0, 
        shadowColor: colors.black,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black', 
        marginHorizontal: 10,
      },
    loginContainer: {
        flexDirection: "column",
        alignItems: 'center',
    },
    logo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 120, 
        alignItems: 'center',
    },
});

export default LoginScreen;
