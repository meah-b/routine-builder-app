import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { colors, CustomText } from "../../../config/theme";
import Button from "../buttons/Buttons";
import MultiSelector from "../utilities/MultiSelect";


interface ConnectionFormProps {
    event: string;
}

const data = [
    { label: 'test 1', value: '1' },
    { label: 'test 2', value: '2' },
    { label: 'test 3', value: '3' },
    { label: 'test 4', value: '4' },
    { label: 'test 5', value: '5' },
];

export default function ConnectionForm(props: ConnectionFormProps){
    const [selected, setSelected] = React.useState([]);
    const { event } = props;

    return (
        <View style={styles.container}>
            <CustomText style={styles.h1} bold>{event}</CustomText>
            <CustomText style={styles.text} bold>CV: 0.0</CustomText>
            <ScrollView contentContainerStyle={styles.scroll}>
                <MultiSelector
                    placeholder='Add Skill'
                    data={data}
                    onChange={setSelected}
                    selected={selected}
                    style={{width:340, justifyContent: 'center'}}
                />
            </ScrollView>
            <Button
            onPress={console.log('save button pressed')}
            variant='black'
            title='Save'
            style={{width: 180, height: 50, marginTop: 30, bottom: 20}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.fade1,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 80,
        height: 490,
        width: 370,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    h1: {
        color: colors.black,
        fontSize: 25,
        marginTop: 20,
    },
    inputView:{
        backgroundColor: colors.white,
        borderRadius:15,
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
    inputText:{
        marginLeft: 20,
        color:colors.black,
        fontSize: 16,
    },
    row:{
        width: 340,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scroll: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flex: 0,
    },
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 5,
    },
})