import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";

import {colors} from '../../config/theme';

export default function TxtInput({ variant }) {
    return (
      <View style={styles.inputView}>
        <AntIcon style={styles.icon} 
            name={
                variant === 'username' ? 'user' : variant === 'password' ? 'lock' : null
              }
            size={20} 
            color={colors.black}/>
        <TextInput
          style={styles.inputText}
          editable
          placeholder={
            variant === 'username' ? 'Username' : variant === 'password' ? 'Password' : variant === 'skill' ? 'Skill Name' : null
          }
          placeholderTextColor={colors.black}
          maxLength={12}
          secureTextEntry={variant === 'password'}
        />
      </View>
    );
  }
  

const styles = StyleSheet.create({
    icon:{
        left:15,
    },
    inputView:{
        backgroundColor: colors.fade1,
        borderRadius:15,
        height: 50,
        width: 285,
        marginBottom:10,
        justifyContent:"center",
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    inputText:{
        position: 'absolute',
        left: 50,
        color:colors.black
    },
});
