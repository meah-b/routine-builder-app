import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

export const colors = {
    white: "#fff",
    grey100: "#D9D9D9",
    grey200: "#9C9C9C",
    grey300: "#797979",
    black: "#000",
    fade1: '#f0d4fc' /*'rgba(255, 255, 255, 0.7)'*/,
    fade2: 'rgba(255, 255, 255, 0.35)',
    purple: "#9747FF",
    purple200: '#5C009F',
    pink: "#FFBBF8",
    gradient: ['#9747FF', '#FFBBF8'],
};

export const CustomText = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'jost-bold': require('../assets/fonts/Jost-Bold.ttf'),
        'jost-regular': require('../assets/fonts/Jost-Regular.ttf'),
      });

      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  const { style, children, bold } = props;
  const fontFamily = bold ? 'jost-bold' : 'jost-regular';

  return (
    <Text style={[{ fontFamily }, style]}>
      {children}
    </Text>
  );
};