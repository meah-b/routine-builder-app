import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import { colors, CustomText } from '../../../config/theme';

const difficultyLevels = [
    { label: 'A', value: '0.1' },
    { label: 'B', value: '0.2' },
    { label: 'C', value: '0.3' },
    { label: 'D', value: '0.4' },
    { label: 'E', value: '0.5' },
    { label: 'F', value: '0.6' },
    { label: 'G', value: '0.7' },
    { label: 'H', value: '0.8' },
    { label: 'I', value: '0.9' },
];
const bars_categories = [
    { label: 'Mount', value: 'mount' },
    { label: 'Circle/Swing', value: 'circle' },
    { label: 'Flight', value: 'flight' },
    { label: 'Dismount', value: 'dismount' },
];
const beam_categories = [
    { label: 'Mount', value: 'mount' },
    { label: 'Acro', value: 'acro' },
    { label: 'Dance', value: 'dance' },
    { label: 'Dismount', value: 'dismount' },
];
const floor_categories = [
    { label: 'Acro', value: 'acro' },
    { label: 'Dance', value: 'dance' },
];

interface DropdownProps {
    variant: string;
}

export default function SkillDropDowns(props: DropdownProps) {
    const { variant } = props;
    
    const [difficulty, setDifficulty] = React.useState([]);
    const [category, setCategory] = React.useState([]);

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.label} bold>Select Difficulty Value:</CustomText>
            <Dropdown
                style={styles.dropdown} 
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{left:20}}
                iconStyle={styles.iconStyle}
                data={difficultyLevels}
                labelField="label"
                valueField="value"
                placeholder="Select Difficulty Value"
                value={difficulty}
                onChange={setDifficulty}
                renderItem={renderDataItem}
            />
            <CustomText style={styles.label} bold>Select Category:</CustomText>
            <Dropdown
                style={styles.dropdown} 
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{left:20}}
                iconStyle={styles.iconStyle}
                data={variant==='bars' ? bars_categories : variant==='beam' ? beam_categories : variant==='floor' ? floor_categories : []}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={category}
                onChange={setCategory}
                renderItem={renderDataItem}
            />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: { 
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flex: 0,
    },
    dropdown: {
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 60,
        width: 340,
        justifyContent:"center",
        marginVertical: 5,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    iconStyle: {
        width: 20,
        height: 20,
        right: 20,
    },
    item: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        color: colors.black,
        fontSize: 18,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    placeholderStyle: {
        color: colors.grey200,
        fontSize: 16,
        left: 20,
    },
    selectedStyle: {
        flexDirection: 'row',
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: colors.fade1,
        color: colors.black,
        width: 350,
        height: 50,
        margin: 4,
        borderRadius: 15,
    },
    textSelectedStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        left: 20,
    },
});
