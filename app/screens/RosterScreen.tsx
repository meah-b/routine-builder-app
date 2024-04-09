import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { doc, getDoc, deleteDoc, updateDoc, deleteField } from 'firebase/firestore';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';

import { CustomText, colors } from '../config/theme';
import AppContext from '../config/context';
import Header from '../assets/components/utilities/Header';
import Button from '../assets/components/buttons/Buttons';
import AthleteCard from '../assets/components/cards/AthleteCard';
import AthleteForm from '../assets/components/forms/AthleteForm';

const levels = [
    { key: 'Senior', value: '13' },
    { key: 'Junior', value: '12' },
    { key: 'Novice', value: '11' },
    { key: '10', value: '10' },
    { key: '9', value: '9' },
    { key: '8', value: '8' },
    { key: '7', value: '7' },
    { key: '6', value: '6' }
]

export default function RosterScreen({navigation}) {
    const [form, setForm] = React.useState(0);
    const user_uid = firebase_auth.currentUser.uid;
    const user_doc = doc(firestore_db, 'users', user_uid);
    
    function List(){
        const [querySnapshot, setQuerySnapshot] = React.useState([]);
        const { selectedAthlete, setSelectedAthlete } = React.useContext(AppContext); 

        function updateList(snapshot: any[]){
            const sortedSnapshot = snapshot.slice().sort((a, b) => {
                const levelA = a.data().level;
                const levelB = b.data().level;
                const indexA = levels.findIndex(level => level.value === levelA);
                const indexB = levels.findIndex(level => level.value === levelB);
                return indexB - indexA;
            });
            return sortedSnapshot
        }

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
                if (snapshotResults.length > 0) {
                    const updatedSnapshot = updateList(snapshotResults)
                    const snapshotMap = updatedSnapshot.map((doc) => (doc.id))
                    setSelectedAthlete(snapshotMap[0].toString())
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        React.useEffect(() => {
            fetchData();
        }, []);

        const twoButtonAlert = (docId: string) =>
        Alert.alert('Caution', `Are you sure you want to delete all of this athlete's data?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: "Delete", onPress: () => handleDelete(docId) },
        ]);

        const handleDelete = async (docId: string) => {
            try {
                const docRef = doc(firestore_db, 'users', docId);
                await deleteDoc(docRef);
                await updateDoc(user_doc, { [`athletes.${docId}`]: deleteField() });
                setQuerySnapshot(prevSnapshot => prevSnapshot.filter(item => item.id !== docId));
                fetchData();
            } catch (error) {
                console.error('Error deleting document:', error);
            }
        }
        
        return (
            <View style={styles.container}>
                <Header></Header>
                <CustomText style={styles.h1} bold>Roster</CustomText>
                <Button 
                    style={styles.addButton} 
                    title='Add Athlete' 
                    variant='black' 
                    onPress={() => setForm(1)}>
                </Button>
                <View style={styles.list_container}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {updateList(querySnapshot).map((doc) => (
                            <AthleteCard 
                            key={doc.id}
                            handleDelete={() => twoButtonAlert(doc.id)}
                            name={doc.data().full_name} 
                            level={doc.data().level} 
                            isSelected={doc.id === selectedAthlete}
                            onPress={() => setSelectedAthlete(doc.id)}
                        />
                        ))}
                    </ScrollView>
                </View>
                <Button 
                    style={styles.updateButton} 
                    title='Update Selected Athlete' 
                    variant='black' 
                    onPress={() => {navigation.navigate('Home')}}>
                </Button>
            </View>
        )
    }

    function Form(){
        return(
            <View style={styles.container}>
                <Header></Header>
                <TouchableOpacity onPress={() => setForm(0)} style={{position: 'absolute', top: 160, left: -180}}>
                    <CustomText 
                        style={styles.text} 
                        bold
                    >back to roster
                    </CustomText>
                </TouchableOpacity>
                <AthleteForm onSubmit={() => setForm(0)}/> 
            </View>
        )
    }

    return (
        <LinearGradient colors={colors.gradient} style={styles.container}>
            {form == 0 ? <List/> : <Form/>}
        </LinearGradient>
    );
    
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        height: 35,
        width: 145,
        top: 200,
        left: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        color: colors.black,
        fontSize: 30,
        position: 'absolute',
        top: 130,
    },
    list_container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 185,
        height: 460,
        width: 370,
    },
    scrollContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18, 
        textDecorationLine:'underline', 
        color: colors.black,
    },
    updateButton: {
        height: 50,
        width: 240,
        marginTop: 20
    },
});
