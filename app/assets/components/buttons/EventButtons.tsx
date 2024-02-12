import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './Buttons';

export default function EventButtons ({variant}) {
    const [selectedVariant, setSelectedVariant] = useState(variant === 'build' ? '' : (variant === 'four' ? 'Vault' : 'Bars'));
    const handleButtonPress = (selectedVariant: string) => {
    setSelectedVariant(selectedVariant);
    };

    return (
        <View style={variant === 'build' ? styles.buildContainer : styles.container}>
            {(variant === 'four' || variant === 'build') && (
                <Button
                    onPress={() => handleButtonPress('Vault')}
                    variant={selectedVariant === 'Vault' ? 'black' : 'white'}
                    title='Vault'
                    style={variant === 'build' ? styles.buildButton : styles.button}/>
            )}
            <Button
                onPress={() => handleButtonPress('Bars')}
                variant={selectedVariant === 'Bars' ? 'black' : 'white'}
                title='Bars'
                style={variant === 'build' ? styles.buildButton : styles.button}/>
            <Button
                onPress={() => handleButtonPress('Beam')}
                variant={selectedVariant === 'Beam' ? 'black' : 'white'}
                title='Beam'
                style={variant === 'build' ? styles.buildButton : styles.button}/>
            <Button
                onPress={() => handleButtonPress('Floor')}
                variant={selectedVariant === 'Floor' ? 'black' : 'white'}
                title='Floor'
                style={variant === 'build' ? styles.buildButton : styles.button}/>
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
});
