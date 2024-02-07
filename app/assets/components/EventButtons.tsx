import React from 'react';
import { StyleSheet, View } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

import Button from './Buttons';

export default function EventButtons ({ 
    variant,
}) {
    //const navigation = useNavigation();
    return (
    <View style={styles.container}>
            {variant === 'four' && (
                <Button
                        onPress={console.log('Vault')}
                        variant='black'
                        title='Vault'
                        style={styles.button}/>
            )}
                <Button
                        onPress={console.log('Bars')}
                        variant='white'
                        title='Bars'
                        style={styles.button}
                />
                <Button
                        onPress={console.log('Beam')}
                        variant='white'
                        title='Beam'
                        style={styles.button}
                />
                <Button
                        onPress={console.log('Floor')}
                        variant='white'
                        title='Floor'
                        style={styles.button}
                />
    </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 180,
            marginVertical: 10,

        },
        button: {
            width: 80,
            height: 50,
            marginHorizontal: 5,
        },
});
