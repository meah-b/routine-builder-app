import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import {colors, WhiteText} from '../../config/theme';

const BlackButton = ({ title, onPress }) => (
    <Pressable style={styles.blackButton} onPress={onPress}>
      <WhiteText style={styles.buttonText}> {title} </WhiteText>
    </Pressable>
  );
  
  const styles = StyleSheet.create({
    blackButton: {
      backgroundColor: colors.black,
      width: 300,
      height: 50,
      borderRadius: 15,
      marginVertical: 5,
      justifyContent: 'center',
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    buttonText: {
      fontSize: 18,
      textAlign: 'center',
    },
});
  
export { BlackButton };