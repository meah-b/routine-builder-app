import React, {useEffect, useState} from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';

import AthleteCard from '../cards/AthleteCard';


export default function CoachesRoster() {
    const user_uid = firebase_auth.currentUser.uid;
    const user_doc = doc(firestore_db, 'users', user_uid);
    const [querySnapshot, setQuerySnapshot] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDocSnapshot = await getDoc(user_doc);
                const athletesObj = userDocSnapshot.data().athletes || {}; 
                const athleteIds = Object.keys(athletesObj); 
                const snapshotPromises = athleteIds.map(async (athleteId) => {
                    const docRef = doc(firestore_db, 'users', athleteId);
                    return await getDoc(docRef);
                });

                const snapshotResults = await Promise.all(snapshotPromises);
                setQuerySnapshot(snapshotResults);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const twoButtonAlert = (docId, name) =>
        Alert.alert('Caution', `Are you sure you want to delete ${name}?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: "Delete",
                onPress: () => handleDelete(docId),
            },
        ]);

    const handleDelete = async (docId: string) => {
        try {
            const docRef = doc(firestore_db, 'users', docId);
            await deleteDoc(docRef);
            setQuerySnapshot(prevSnapshot => prevSnapshot.filter(item => item.id !== docId));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {querySnapshot.map((doc) => (
                    <AthleteCard 
                        key={doc.id}
                        handleDelete={() => twoButtonAlert(doc.id, doc.data().name)}
                        name={doc.data().name} 
                        level={doc.data().level} 
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
        height: 470,
        width: 370,
    },
    scrollContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
})