import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';

import Button from './Buttons';
interface Props {
  onPress6: any; 
  onPress7: any; 
  onPress8: any; 
  onPress9: any; 
  onPress10: any; 
  onPressN: any; 
  onPressJ: any; 
  onPressS: any; 
}
export default function LevelButtons (props: Props) {
  const {onPress6, onPress7, onPress8, onPress9, onPress10, onPressN, onPressJ, onPressS} = props;
  const [selected, setSelected] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.levels}>
        <Button title= '6' variant={selected === '6' ? 'black' : 'white'} style={styles.numButtons} onPress={() => { onPress6(); setSelected('6'); }} />
        <Button title= '7' variant={selected === '7' ? 'black' : 'white'} style={styles.numButtons} onPress={() => { onPress7(); setSelected('7'); }} />
        <Button title= '8' variant={selected === '8' ? 'black' : 'white'} style={styles.numButtons} onPress={() => { onPress8(); setSelected('8'); }} />
        <Button title= '9' variant={selected === '9' ? 'black' : 'white'} style={styles.numButtons} onPress={() => { onPress9(); setSelected('9'); }} />
        <Button title= '10' variant={selected === '10' ? 'black' : 'white'} style={styles.numButtons} onPress={() => { onPress10(); setSelected('10'); }} />
      </View>
      <View style={styles.levels}>
        <Button title= 'Novice' variant={selected === 'Novice' ? 'black' : 'white'} style={styles.levelButtons} onPress={() => { onPressN(); setSelected('Novice'); }} />
        <Button title= 'Junior' variant={selected === 'Junior' ? 'black' : 'white'} style={styles.levelButtons} onPress={() => { onPressJ(); setSelected('Junior'); }} />
        <Button title= 'Senior' variant={selected === 'Senior' ? 'black' : 'white'} style={styles.levelButtons} onPress={() => { onPressS(); setSelected('Senior'); }} />
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
