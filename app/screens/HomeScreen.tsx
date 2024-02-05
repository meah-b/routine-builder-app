import React from 'react';
import { StyleSheet, View } from 'react-native'

import { CustomText } from '../config/theme'

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <CustomText style={{fontSize: 30}}>Home</CustomText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})