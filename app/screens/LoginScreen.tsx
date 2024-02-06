import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";


import {CustomText, colors} from '../config/theme';
import {GradientSvg1, GradientSvg2} from '../assets/components/Gradients';
import {Logo} from '../assets/components/Logo';
import Button from '../assets/components/Buttons';
import TxtInput from '../assets/components/TextInput';


export default function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.gradient1}><GradientSvg1/></View>
            <View style={styles.gradient2}><GradientSvg2/></View>
            <View style={styles.logo}><Logo/></View>
            <View style={styles.loginContainer}>
                <TxtInput variant={"username"}/>
                <TxtInput variant={"password"}/>
            </View>
            <View style={styles.loginButtonContainer}>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    variant='login'
                    title='Login'
                    style
                />
                <TouchableOpacity>
                    <CustomText 
                        style={{fontSize:14, textDecorationLine:'underline'}} 
                        onPress={console.log('button 2 pressed')} bold>forgot password
                    </CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.alternateContainer}>
                <View style={styles.row}>
                    <View style={styles.line}></View>
                    <CustomText style={{fontSize:14}}bold>or sign in with</CustomText>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity style={styles.tempInputView}>
                    <AntIcon style={{left:20}} 
                        name={'google'}
                        size={20} 
                    />
                    <CustomText style={{left:60, position: 'absolute', fontSize: 16}}bold>Continue with Google</CustomText>
                </TouchableOpacity>
                <View style={styles.row}>
                    <CustomText style={{fontSize:14}}bold>Don't have an account? </CustomText>
                    <TouchableOpacity>
                        <CustomText 
                            style={{fontSize:14, textDecorationLine:'underline', color: colors.purple}} 
                            onPress={console.log('button 2 pressed')}bold>Sign up
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    alternateContainer: {
        position: 'absolute',
        bottom: 70,
        flexDirection: "column", 
        alignItems: 'center',
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
    loginButtonContainer: {
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: 15,
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
    row:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    tempInputView:{
        backgroundColor: colors.white,
        borderRadius:15,
        height: 50,
        width: 285,
        marginVertical: 20,
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
});

