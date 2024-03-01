import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase_auth } from '../Firebase/firebaseConfig';

import { CustomText, colors } from '../config/theme';
import Button from '../assets/components/buttons/Buttons';


export default function Profile() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.h1} bold>Profile</CustomText>
            <TouchableOpacity style={styles.container} onPress={handleBackPress}>
                <CustomText style={[styles.text, { textDecorationLine: 'underline', top:300 }]} bold>Back</CustomText>
            </TouchableOpacity>
            <Button
                variant='black'
                title='Sign Out'
                style={styles.button}
                onPress={() => firebase_auth.signOut()}>
            </Button>         
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 120,
        marginBottom: 100,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 130,
    },
    text: {
        color: colors.black,
        fontSize: 30,
        marginTop: 30,
    },
});
