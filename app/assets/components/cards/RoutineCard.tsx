import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../buttons/Buttons';
import { colors, CustomText } from '../../../config/theme';
import {AntDesign} from '@expo/vector-icons';

interface Props {
    name: string;
    skills: string;
    connections: string;
    sv: string;
    handleDelete: () => void;
}

export default function RoutineCard(props: Props) {
    const { name, sv, handleDelete, skills, connections} = props;
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={expanded ? styles.expandedContainer : styles.container}>
            <View style={styles.col}>
                <CustomText style={styles.name} bold>
                    {name}
                </CustomText>
                <CustomText style={styles.text}>Start Value: {sv}</CustomText>
                {expanded && (
                    <>
                        <CustomText style={styles.text}>Skills: {skills}</CustomText>
                        <CustomText style={styles.text}>Connections: {connections}</CustomText>
                    </>
                )}
            </View>
            <Button
                onPress={handleExpand}
                variant="black"
                title={expanded ? 'Hide Details' : 'View More'}
                style={{ width: expanded ? 140 : 120, height: 45 }}
            />
            {expanded && <AntDesign 
                    color="black" 
                    name="delete" 
                    size={24}  
                    style={styles.icon}
                    onPress={handleDelete}
                />}
        </View>
    );
}

const styles = StyleSheet.create({
    col: {
        flexDirection: 'column',
        gap: 3,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        color: colors.black,
        width: 350,
        height: 80,
        paddingHorizontal: 15,
        margin: 4,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    text: {
        fontSize: 20,
    },
    expandedContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        color: colors.black,
        width: 350,
        height: 'auto',
        margin: 4,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        position: 'absolute',
        top: 15,
        right: 20
    },
    name: {
        fontSize: 20,
    },
});