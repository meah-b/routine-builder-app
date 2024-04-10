import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { firebase_auth, firestore_db } from '../Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import { CustomText, colors } from '../config/theme';
import Button from '../assets/components/buttons/Buttons';

export default function ExportRoster({navigation}) {
    const user_uid = firebase_auth.currentUser.uid;
    const userDocRef = doc(firestore_db, "users", user_uid);

    
    const fetchData = async () => {
        try {
            const userRef = doc(firestore_db, 'users', user_uid);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.data();
                if (userData && Object.keys(userData).length > 0) {
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userDocRef]);


    return (
        <View style={styles.container}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

