import React, {useState, useEffect} from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../../../Firebase/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

import RoutineCard from '../cards/RoutineCard';
import AppContext from '../../../config/context';

interface Props {
    event: string;
    order: string;
}

export default function RoutineList(props: Props) {
    const { event, order } = props;
    const { selectedAthlete } = React.useContext(AppContext); 
    const user_uid = selectedAthlete ? selectedAthlete : firebase_auth.currentUser.uid;
    const routinesRef = collection(doc(firestore_db, 'users', user_uid, 'events', event.toLowerCase()), 'routines');
    const [querySnapshot, setQuerySnapshot] = useState([]);

    const fetchData = async () => {
        const snapshot = await getDocs(routinesRef);
        setQuerySnapshot(snapshot.docs);
    };

    useEffect(() => {
        fetchData();
    }, [event]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [event])
    );

    function sortDescending(snapshot) {
        const levelsArray = snapshot.map(doc => parseInt(doc.data().sv));
        levelsArray.sort((a, b) => b - a);
        const sortedSnapshot = levelsArray.map(level => {
            return snapshot.find(doc => parseInt(doc.data().sv) === level);
        });
        return sortedSnapshot;
    }
    
    function sortAscending(snapshot) {
        const levelsArray = snapshot.map(doc => parseInt(doc.data().sv));
        levelsArray.sort((a, b) => a - b);
        const sortedSnapshot = levelsArray.map(level => {
            return snapshot.find(doc => parseInt(doc.data().sv) === level);
        });
        return sortedSnapshot;
    }

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

    const handleDelete = async (docId) => {
        try {
            const docRef = doc(routinesRef, docId);
            await deleteDoc(docRef);
            setQuerySnapshot(prevSnapshot => prevSnapshot.filter(doc => doc.id !== docId));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {(order === 'asc' ? sortAscending(querySnapshot) : sortDescending(querySnapshot)).map((doc) => {
                        return (
                            <RoutineCard
                                key={doc.id}
                                skills={doc.data().skills.join(', ')}
                                connections={doc.data().connections.join(', ')}
                                handleDelete={() => twoButtonAlert(doc.id)}
                                name={doc.id}
                                sv={doc.data().sv} 
                            />
                        );
                    })}
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