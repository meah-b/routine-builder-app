import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/utilities/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import EventButtons from '../assets/components/buttons/EventButtons';
import Button from '../assets/components/buttons/Buttons';
import ConnectionForm from '../assets/components/forms/ConnectionForm';
import ConnectionList from '../assets/components/lists/ConnectionList';

export default function ConnectionLibrary() {
    const [form, setForm] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState('Bars');

    function Form(){
        if (form === 0){
            return (
                <View style={styles.container}>
                    <CustomText style={styles.h1} bold>Connection Library</CustomText>
                    <EventButtons 
                    variant='three'
                    selectedVariant={selectedVariant}
                    onPress1
                    onPress2={() => setSelectedVariant('Bars')} 
                    onPress3={() => setSelectedVariant('Beam')} 
                    onPress4={() => setSelectedVariant('Floor')}
                    />
                    <Button 
                        style={styles.addButton} 
                        title='Add Connection' 
                        variant='black' 
                        onPress={() => setForm(1)}>
                    </Button>
                    <ConnectionList event={selectedVariant} ></ConnectionList>
                </View>
            )
        } else {
            return(
                <View>
                    <TouchableOpacity onPress={() => setForm(0)} style={{marginBottom: 15, marginTop: 60, left: 5}}>
                        <CustomText 
                            style={styles.text} 
                            bold
                        >back to connection library
                        </CustomText>
                    </TouchableOpacity>
                    <ConnectionForm event={selectedVariant} onSubmit={() => setForm(0)}/> 
                </View>
            )
        }
    }
    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            <Header></Header>
            <Form/>
            <HomeButton></HomeButton>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        height: 35,
        width: 165,
        top: 255,
        left: 10,
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
        fontSize: 18, 
        textDecorationLine:'underline', 
        color: colors.black,
    }
});
