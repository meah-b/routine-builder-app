import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import MultiSelector from './MultiSelect';


const data1 = [
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

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <MultiSelector
                data={data1}
                selected={selected1}
                placeholder="Add Skills"
                onChange={setSelected1}
                style
            />
            <MultiSelector
                data={data2}
                selected={selected2}
                placeholder="Add Connections"
                onChange={setSelected2}
                style
            />
        </ScrollView>
    );
}
    
const styles = StyleSheet.create({
    scrollContainer: { 
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flex: 0,
    },
});
