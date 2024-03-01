import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import SkillCard from '../cards/SkillCard';


export default function SkillList() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <SkillCard name='Yurchenko Layout' difficulty={3.6} category='Acro'></SkillCard>
                <SkillCard name='Yurchenko Layout' difficulty={3.6} category='Acro'></SkillCard>
                <SkillCard name='Yurchenko Layout' difficulty={3.6} category='Acro'></SkillCard>
                <SkillCard name='Yurchenko Layout' difficulty={3.6} category='Acro'></SkillCard>
                <SkillCard name='Yurchenko Layout' difficulty={3.6} category='Acro'></SkillCard>
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