import React, {useState, useEffect} from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { colors, CustomText } from "../../../config/theme";
import Button from "../buttons/Buttons";
import MultiSelector from "../utilities/MultiSelect";


interface ConnectionFormProps {
    event: string;
    onSubmit: any;
}

export default function ConnectionForm(props: ConnectionFormProps){
    const [selected, setSelected] = React.useState([]);
    const [name, setName] = useState('');
    const { event, onSubmit } = props;
    const user_uid = firebase_auth.currentUser.uid;
    const skillsRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'skills');
    const [querySnapshot, setQuerySnapshot] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(skillsRef);
            setQuerySnapshot(snapshot.docs);
        };
        fetchData();
    }, [skillsRef]);

    function addConnection(){
        const user_uid = firebase_auth.currentUser.uid;
        const conRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'connections');
        setDoc(doc(conRef, name), {
            name: name,
            skills: selected,
        },{merge:true});
    }

    return (
        <View style={styles.container}>
            <CustomText style={styles.h1} bold>{event}</CustomText>
            <CustomText style={styles.text} bold>CV: 0.0</CustomText>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={[styles.inputView, {height: 50}]}>
                    <TextInput
                    style={styles.inputText}
                    editable
                    placeholder='Connection Name'
                    placeholderTextColor={colors.grey200}
                    maxLength={20}
                    onChangeText={(text) => setName(text)}
                    value={name}
                    />
                </View>
                <MultiSelector
                    placeholder='Add Skill'
                    data={querySnapshot.map((doc) => ({
                        label: doc.data().name,
                        value: doc.id
                    }))}
                    onChange={setSelected}
                    selected={selected}
                    style={{width:340, justifyContent: 'center'}}
                />
            </ScrollView>
            <Button
                onPress={() => {
                    if (selected.length <= 1) {
                        alert('Please add at least 2 skills!');
                    } else if (name ===''){
                        alert('Please name the connection!');
                    } else {
                        addConnection();
                        onSubmit();
                    }
                }}
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