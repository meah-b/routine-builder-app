import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from './Buttons';

export default function LevelButtons () {
  return (
    <View style={styles.container}>
      <View style={styles.levels}>
        <Button title= '6' variant="white" style={styles.numButtons} onPress />
        <Button title= '7' variant="white" style={styles.numButtons} onPress />
        <Button title= '8' variant="white" style={styles.numButtons} onPress />
        <Button title= '9' variant="white" style={styles.numButtons} onPress />
        <Button title= '10' variant="white" style={styles.numButtons} onPress />
      </View>
      <View style={styles.levels}>
        <Button title= 'Novice' variant="white" style={styles.levelButtons} onPress />
        <Button title= 'Junior' variant="white" style={styles.levelButtons} onPress />
        <Button title= 'Senior' variant="white" style={styles.levelButtons} onPress />
      </View>
    </View>
    
  );
}

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    levels: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    levelButtons: {
        height: 50,
        width: 95,
        marginHorizontal: 6,
    },
    numButtons: {
      height: 50,
      width: 55,
      marginHorizontal: 4,
    },
});
