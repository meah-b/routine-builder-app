import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './Buttons';

export default function EventButtons ({variant, selectedVariant, onPress1, onPress2, onPress3, onPress4}) {

    return (
        <View style={variant === 'build' ? styles.buildContainer : styles.container}>
            {(variant === 'four' || variant === 'build') && (
                <Button
                    onPress={onPress1}
                    variant={selectedVariant === 'Vault' ? 'black' : 'white'}
                    title='Vault'
                    style={variant === 'build' ? styles.buildButton : styles.button}/>
            )}
            <Button
                onPress={onPress2}
                variant={selectedVariant === 'Bars' ? 'black' : 'white'}
                title='Bars'
                style={variant === 'build' ? styles.buildButton : variant === 'three' ? styles.threeButton : styles.button}/>
            <Button
                onPress={onPress3}
                variant={selectedVariant === 'Beam' ? 'black' : 'white'}
                title='Beam'
                style={variant === 'build' ? styles.buildButton : variant === 'three' ? styles.threeButton : styles.button}/>
            <Button
                onPress={onPress4}
                variant={selectedVariant === 'Floor' ? 'black' : 'white'}
                title='Floor'
                style={variant === 'build' ? styles.buildButton : variant === 'three' ? styles.threeButton : styles.button}/>
        </View>
    );
}

const styles = StyleSheet.create({
    buildButton: {
        width: 70,
        height: 45,
        marginHorizontal: 5,
    },
    buildContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 80,
        height: 50,
        marginHorizontal: 5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 180,
        marginVertical: 10,
    },
    threeButton: {
        width: 110,
        height: 50,
        marginHorizontal: 5,
    },
});
