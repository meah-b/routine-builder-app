import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { MultiSelect } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

import { colors, CustomText } from '../../../config/theme';
import Button from '../buttons/Buttons';

interface Props{
    routine_id: string;
    event: string;
}

export default function RoutineBuilderForm(props: Props) {
    const {routine_id, event} = props;
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedConnections, setSelectedConnections] = useState([]);
    const user_uid = firebase_auth.currentUser.uid;
    const skillsRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'skills');
    const connectionsRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'connections');
    const [querySkills, setQuerySkills] = useState([]);
    const [queryConnections, setQueryConnections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(skillsRef);
            setQuerySkills(snapshot.docs);
        };
        fetchData();
    }, [skillsRef]);
    

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.h1} bold>{event}</CustomText>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container2}>
                    <MultiSelect
                        style={[styles.dropdown]} 
                        placeholderStyle={styles.placeholderStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={querySkills.map((doc) => ({
                            label: doc.data().name,
                            value: doc.id
                        }))}
                        labelField="label"
                        valueField="value"
                        placeholder={'Add Skills'}
                        value={selectedSkills}
                        search
                        searchPlaceholder="Search..."
                        onChange={setSelectedSkills}
                        renderItem={renderDataItem}
                        renderSelectedItem={(item, unSelect) => (
                            <View style={[styles.selectedStyle]}>
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
                </View>
                <MultiSelect
                    style={[styles.dropdown]} 
                    placeholderStyle={styles.placeholderStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={queryConnections.map((doc) => ({
                        label: doc.data().name,
                        value: doc.id
                    }))}
                    labelField="label"
                    valueField="value"
                    placeholder={'Add Connections'}
                    value={selectedConnections}
                    search
                    searchPlaceholder="Search..."
                    onChange={setSelectedConnections}
                    renderItem={renderDataItem}
                    renderSelectedItem={(item, unSelect) => (
                        <View style={[styles.selectedStyle]}>
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
            <Button
                title="Calculate Start Value"
                variant='black'
                style={styles.button}
                onPress={() => {}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 50,
        position: 'absolute',
        top: 500
    },
    container: {
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 80,
        height: 490,
        width: 370,
    },
    scrollContainer: { 
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        flex: 0,
    },
    delete: {
        position: 'absolute',
        right: 20,
    },
    dropdown: {
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 50,
        width: 340,
        justifyContent:"center",
        marginVertical: 5,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    h1: {
        color: colors.black,
        fontSize: 25,
        marginTop: 40,
        marginBottom: 10,
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
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
        marginLeft: 10,
    },
    selectedStyle: {
        flexDirection: 'row',
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: colors.fade1,
        color: colors.black,
        width: 340,
        height: 50,
        margin: 4,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
    },
    container2: { 
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