import React, {useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';

import SkillCard from '../cards/SkillCard';
import AppContext from '../../../config/context';

interface SkillFormProps {
    event: string;
}

export default function SkillList(props: SkillFormProps) {
    const { event } = props;
    const { selectedAthlete } = React.useContext(AppContext); 
    const user_uid = selectedAthlete ? selectedAthlete : firebase_auth.currentUser.uid;
    const skillsRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'skills');
    const [querySnapshot, setQuerySnapshot] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(skillsRef);
            setQuerySnapshot(snapshot.docs);
        };
        fetchData();
    }, [skillsRef]);

    const twoButtonAlert = (name) =>
        Alert.alert('Caution', `Are you sure you want to delete ${name}?`, [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: "Delete", 
            onPress: () => handleDelete(name)},
    ]);

    const handleDelete = async (docId: string) => {
        try {
            const docRef = doc(skillsRef, docId);
            await deleteDoc(docRef);
            setQuerySnapshot(prevSnapshot => prevSnapshot.filter(doc => doc.id !== docId));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {querySnapshot.map((doc) => (
                    <SkillCard 
                        key={doc.id}
                        handleDelete={() => twoButtonAlert(doc.id)}
                        name={doc.data().name} 
                        difficulty={doc.data().difficulty.label} 
                        category={doc.data().category.label}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 160,
        height: 400,
        width: 370,
    },
    scrollContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
})