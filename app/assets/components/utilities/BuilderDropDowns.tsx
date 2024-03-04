import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { MultiSelect } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

import { colors } from '../../../config/theme';


interface Props {
    event: string;
    routine_id: string;
}
    
export default function BuilderDropDowns(props: Props) {
    const {event, routine_id} = props;
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedConnections, setSelectedConnections] = useState([]);
    const user_uid = firebase_auth.currentUser.uid;
    const skillsRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'skills');
    const connectionsRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'connections');
    const [querySkills, setQuerySkills] = useState([]);
    const [queryConnections, setQueryConnections] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const snapshotSkills = await getDocs(skillsRef);
            setQuerySkills(snapshotSkills.docs);
            const snapshotConnections = await getDocs(connectionsRef);
            setQueryConnections(snapshotConnections.docs)
        };
        fetchData();
    }, [skillsRef, connectionsRef]);

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <MultiSelect
                    style={[styles.dropdown]} 
                    placeholderStyle={styles.placeholderStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={querySkills.map((doc) => ({
                        label: doc.data().name,
                        value: doc.data().difficulties
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
    delete: {
        position: 'absolute',
        right: 20,
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
        alignItems: 'center',
        marginHorizontal: 15,
        backgroundColor: colors.fade1,
        color: colors.black,
        width: 350,
        height: 50,
        margin: 4,
        borderRadius: 15,
    },
    container: { 
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
