import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

export const colors = {
    white: "#fff",
    grey100: "#D9D9D9",
    grey200: "#9C9C9C",
    black: "#000",
};

export const fades = {
  primary: 0.7,
  secondary: 0.35,
};

export const BlackText = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);
  
    useEffect(() => {
      async function loadFont() {
        await Font.loadAsync({
          'jost-bold': require('../assets/fonts/Jost-Bold.ttf'),
        });
  
        setFontLoaded(true);
      }
  
      loadFont();
    }, []);
  
    if (!fontLoaded) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <Text style={{ ...props.style, fontFamily: 'jost-bold' }}>
        {props.children}
      </Text>
    );
  };

  export const WhiteText = (props) => {
    const [fontLoaded, setFontLoaded] = useState(false);
  
    useEffect(() => {
      async function loadFont() {
        await Font.loadAsync({
          'jost-bold': require('../assets/fonts/Jost-Bold.ttf'),
        });
  
        setFontLoaded(true);
      }
  
      loadFont();
    }, []);
  
    if (!fontLoaded) {
      return <Text>Loading...</Text>;
    }
  
    return (
      <Text style={{ ...props.style, fontFamily: 'jost-bold', color: colors.white }}>
        {props.children}
      </Text>
    );
  };