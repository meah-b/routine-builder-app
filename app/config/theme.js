import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

export const colors = {
    pink100: "#DCC5F9",
    pink200: "#F4CCFA",
    blue200: "#92C5FC",
    purple400: "#6C79CF",
    white: "#fff",
    grey100: "#D9D9D9",
    black: "#000",
};

export const CustomText = (props) => {
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
