import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Pressable } from 'react-native';

const LoginButton1 = ({ onPress }) => {
    const loginButton1 = `
    <svg width="303" height="70" viewBox="0 0 303 70" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g filter="url(#filter0_d_51_199)">
    <rect x="10" y="6" width="283" height="50" rx="25" fill="white"/>
    </g>
    <rect x="27" y="17" width="21" height="29" fill="url(#pattern0)"/>
    <defs>
    <filter id="filter0_d_51_199" x="0" y="0" width="303" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="5"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.233333 0 0 0 0 0 0 0 0 0 0.416667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_199"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_51_199" result="shape"/>
    </filter>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_51_199" transform="matrix(0.0111111 0 0 0.00804598 0 0.137931)"/>
    </pattern>
    <image id="image0_51_199" width="90" height="90" xlink:href="data:image/png;base64,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"/>
    </defs>
    </svg>
    `;
    
    return (
      <Pressable onPress={onPress}>
          <SvgXml xml={loginButton1} />
      </Pressable>
  );
};

export default LoginButton1;