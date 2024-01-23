import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Pressable } from 'react-native';

const LoginButton2 = ({ onPress }) => {
    const loginButton2 = `
    <svg width="303" height="70" viewBox="0 0 303 70" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g filter="url(#filter0_d_51_213)">
    <rect x="10" y="6" width="283" height="50" rx="25" fill="white"/>
    </g>
    <rect x="25" y="28" width="27" height="27" fill="url(#pattern0)"/>
    <defs>
    <filter id="filter0_d_51_213" x="0" y="0" width="303" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.233333 0 0 0 0 0 0 0 0 0 0.416667 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_213"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_51_213" result="shape"/>
    </filter>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_51_213" transform="scale(0.0111)"/>
    </pattern>
    <image id="image0_51_213" width="90" height="90" xlink:href="data:image/png;base64,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"/>
    </defs>
    </svg>
    `;
    
    return (
        <Pressable onPress={onPress}>
            <SvgXml xml={loginButton2} />
        </Pressable>
    );
};

export default LoginButton2;