import React, {useState} from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { colors, CustomText } from "../../../config/theme";
import SkillDropDowns from "../utilities/SkillDropDowns";
import Button from "../buttons/Buttons";


interface SkillFormProps {
    event: string;
    onSubmit: any;
}

export default function SkillForm(props: SkillFormProps){
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState([]);
    const [category, setCategory] = useState([]);
    const { event, onSubmit } = props;

    function addSkill(){
        const user_uid = firebase_auth.currentUser.uid;
        const skillsRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'skills');
        setDoc(doc(skillsRef, name), {
            name: name,
            difficulty: difficulty,
            category: category
        },{merge:true});
    }

    return (
        <View style={[styles.container, event === 'Vault' ? {height:400, marginBottom: 170,}: null]}>
            <CustomText style={styles.h1} bold>{event}</CustomText>
            <CustomText style={styles.text} bold>Skill Name:</CustomText>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputText}
                editable
                placeholder='Skill Name'
                placeholderTextColor={colors.grey200}
                maxLength={30}
                onChangeText={(text) => setName(text)}
                value={name}
                />
            </View>
            <SkillDropDowns 
            variant={event} 
            valueD={difficulty} 
            onChangeD={setDifficulty}
            valueC={category}
            onChangeC={setCategory}/>
            <Button
            onPress={() => {
                if (name === '' || difficulty.length === 0 || event != 'Vault' && category.length === 0) {
                    alert('Please input all values!');
                } else {
                    addSkill();
                    onSubmit();
                }
            }}
            variant='black'
            title='Save'
            style={{width: 180, height: 50, marginTop: 15}}
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
    text: {
        color: colors.black,
        fontSize: 18,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
})