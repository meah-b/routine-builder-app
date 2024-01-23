import React from 'react';
import { SvgXml } from 'react-native-svg';

const GradientSvg1 = () => {
    const gradientBg1 = `
    <svg width="390" height="642" viewBox="0 0 390 642" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_7_15)">
    <path d="M0 589.254V0H390V630C299.536 516.078 176.289 575.924 147.758 589.254C107.552 608.039 21.1082 609.122 0 589.254Z" fill="url(#paint0_linear_7_15)"/>
    </g>
    <defs>
    <filter id="filter0_d_7_15" x="-8" y="-4" width="406" height="646" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="4"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.233333 0 0 0 0 0 0 0 0 0 0.416667 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_15"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_15" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_7_15" x1="0" y1="586.545" x2="390" y2="586.545" gradientUnits="userSpaceOnUse">
    <stop offset="0.225" stop-color="#8B63FF"/>
    <stop offset="1" stop-color="#FFBBF8"/>
    </linearGradient>
    </defs>
    </svg>
    `;
    
  return <SvgXml xml={gradientBg1} />;
};

export default GradientSvg1;