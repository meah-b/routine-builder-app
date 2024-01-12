import React from 'react';
import {Image, ImageBackground, StyleSheet, View, Text} from 'react-native';

import colors from '../config/colors';

function WelcomeScreen(props) {
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}>
                <Image
                    source={require('../assets/login.png')}
                    style={styles.gradient}
                />
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
    },
    gradient: {
        flex: 0.8,
    },
});

export default WelcomeScreen;