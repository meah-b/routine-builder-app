import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';


import { colors } from '../../../config/theme';

const data = [
    { label: 'React Native', value: '1' },
    { label: 'Javascript', value: '2' },
    { label: 'Laravel', value: '3' },
    { label: 'PHP', value: '4' },
    { label: 'jQuery', value: '5' },
    { label: 'Bootstrap', value: '6' },
    { label: 'HTML', value: '7' },
    { label: 'CSS', value: '8' },
];
const data2 = [
    { label: 'test 1', value: '1' },
    { label: 'test 2', value: '2' },
    { label: 'test 3', value: '3' },
];

    
export default function BuilderDropDowns() {
    const [selected1, setSelected1] = React.useState([]);
    const [selected2, setSelected2] = React.useState([]);

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <MultiSelect
                style={styles.dropdown} 
                placeholderStyle={styles.placeholderStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Add Skills"
                value={selected1}
                search
                searchPlaceholder="Search..."
                onChange={setSelected1}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                    <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.label}</Text>
                        <AntDesign 
                            color="black" 
                            name="delete" 
                            size={17} 
                            style={styles.delete} 
                            onPress={() => unSelect && unSelect(item)}/>
                    </View>
                )}
            />
            <MultiSelect
                style={styles.dropdown} 
                placeholderStyle={styles.placeholderStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data2}
                labelField="label"
                valueField="value"
                placeholder="Add Connections"
                value={selected2}
                search
                searchPlaceholder="Search..."
                onChange={setSelected2}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (   
                    <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>{item.label}</Text>
                        <AntDesign 
                            color="black" 
                            name="delete" 
                            size={17} 
                            style={styles.delete} 
                            onPress={() => unSelect && unSelect(item)}/>
                    </View>
                )}
            />
        </ScrollView>
    );
}
    
const styles = StyleSheet.create({
    delete: {
        position: 'absolute',
        right: 10,
    },
    dropdown: {
        height: 50,
        width: 350,
        marginHorizontal: 3,
        marginVertical: 5,
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 12,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 1,},
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    item: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputSearchStyle: {
        height: 50,
        borderRadius: 15,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        fontWeight: 'bold',
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
    scrollContainer: { 
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flex: 0,
    },
    textSelectedStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        left: 20,
    },
});
