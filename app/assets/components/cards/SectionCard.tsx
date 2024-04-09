import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../buttons/Buttons';
import {colors, CustomText} from '../../../config/theme';


export default function SectionCard({variant, count, onPress}) {
    
    let title: string, subTitle: string, buttonTitle: string, padding: number;

    if (variant === 'Skills') {
        title = 'Skills Library';
        subTitle = count + ' Skills';
        buttonTitle = 'View More';
    } else if (variant === 'Connections') {
        title = 'Connection Library';
        subTitle = count + ' Connections';
        buttonTitle = 'View More';
    } else if (variant === 'Routines') {
        title = 'Routine Library';
        subTitle = count + ' Routines';
        buttonTitle = 'View More';
    } else if (variant === 'Builder') {
        title = 'Routine Builder';
        subTitle = 'Calculate Your Start Value';
        buttonTitle = 'Create';
        padding = 120;
    }

    return (
        <View style={styles.container}>
            <CustomText style={styles.title} bold>{title}</CustomText>
            <CustomText style={styles.subTitle}>{subTitle}</CustomText>
            <Button 
                onPress={onPress}
                variant='black'
                title={buttonTitle}
                style={{ paddingHorizontal: variant === 'Builder' ? 118 : 100}}>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        paddingHorizontal: 27,
        paddingVertical: 15,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    subTitle: {
        fontSize: 18,
    },
    title: {
        fontSize: 28,
    },
});