import React from 'react';
import { SvgXml } from 'react-native-svg';

const GradientSvg2 = () => {
    const gradientBg2 = `
    <svg width="390" height="624" viewBox="0 0 390 624" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_7_16)">
    <path d="M0 597.105V0H390V597.105C307.577 494.156 173.892 583.379 133.686 597.105C76.3176 616.691 21.1082 617.237 0 597.105Z" fill="url(#paint0_linear_7_16)"/>
    </g>
    <defs>
    <filter id="filter0_d_7_16" x="-8" y="-4" width="406" height="628" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="4"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.233333 0 0 0 0 0 0 0 0 0 0.416667 0 0 0 0.15 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_16"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_16" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_7_16" x1="8.20462e-08" y1="1.25038e-07" x2="525.065" y2="429.082" gradientUnits="userSpaceOnUse">
    <stop offset="0.29" stop-color="#DCC5F9"/>
    <stop offset="0.71" stop-color="#92C5FC"/>
    </linearGradient>
    </defs>
    </svg>
    `;
    
  return <SvgXml xml={gradientBg2} />;
};

export default GradientSvg2;