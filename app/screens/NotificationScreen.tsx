import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CustomText, colors } from '../config/theme';

export default function NotifScreen() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.text} bold>Notifications</CustomText>
            <TouchableOpacity style={styles.container} onPress={handleBackPress}>
                <CustomText style={[styles.text, { textDecorationLine: 'underline', top:300 }]} bold>Back</CustomText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 130,
    },
});
