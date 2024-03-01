import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { CustomText, colors } from '../config/theme';
import Header from '../assets/components/Header';
import HomeButton from '../assets/components/buttons/HomeButton';
import EventButtons from '../assets/components/buttons/EventButtons';
import Button from '../assets/components/buttons/Buttons';
import RoutineList from '../assets/components/lists/RoutineList';

export default function RoutineLibrary() {
    const [selectedVariant, setSelectedVariant] = useState('Vault');
    const navigation = useNavigation();

    const handleAddRoutine = () => {
        navigation.navigate('Routine Builder' as never); 
    };

    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            <Header />
            <CustomText style={styles.text} bold>
                Routine Library
            </CustomText>
            <EventButtons 
            variant="four" 
            selectedVariant={selectedVariant}
            onPress1={() => setSelectedVariant('Vault')}
            onPress2={() => setSelectedVariant('Bars')} 
            onPress3={() => setSelectedVariant('Beam')} 
            onPress4={() => setSelectedVariant('Floor')}
            />
            <Button
                style={styles.addButton}
                title="Add Routine"
                variant="black"
                onPress={handleAddRoutine}
            />
            <RoutineList></RoutineList>
            <HomeButton/>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        height: 35,
        width: 140,
        top: 255,
        left: 20,
    },
    container: {
        flex: 1,
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
