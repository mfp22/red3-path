import { styled } from '@stitches/react';

const __rangeHandleColor = "#ffffff";      // !default
const __rangeHandleColorHover = "#907aff54";       // !default
const __rangeHandleSize = "'12px'"; // def 16px        // !default
const __rangeHandleRadius = "25%"; // def 50%

const __rangeTrackColor = "#6c48f04d";     // !default
const __rangeTrackHeight = "1px"; // def 2px       // !default
const __rangeTrackBorderColor = "rgba(108; 72; 240; 0.5)";     // !default

export const Slider = styled('input', {
    //'input[type = "range"].ui - slider': {
        WebkitAppearance: "none",
        width: "100%", //__range-label-width: 60px !default; width: calc(100% - (#{__range-label-width + 10px}));
        height: __rangeTrackHeight,
        borderRadius: "5px",
        background: __rangeTrackColor,
        outline: "none",
        padding: "0",
        margin: "0",
        cursor: "pointer",

        // Range Handle
        '&::-webkit-slider-thumb': {
            WebkitAppearance: "none",
            width: __rangeHandleSize,
            height: __rangeHandleSize,
            borderRadius: __rangeHandleRadius,
            background: __rangeHandleColor,
            cursor: "pointer",
            transition: "all 0.15s ease-in-out",
            border: `1px solid ${__rangeTrackColor}`,
            borderBottom: `1px solid ${__rangeTrackBorderColor}`,
            borderRight: `1px solid ${__rangeTrackBorderColor}`,
            '&:hover': {
                background: __rangeHandleColorHover,
                transform: "scale(1.2)",
                border: "1px solid white"
            }
        },
        '&::-moz-range-thumb': {
            width: __rangeHandleSize,
            height: __rangeHandleSize,
            border: "0",
            borderRadius: __rangeHandleRadius,
            background: __rangeHandleColor,
            cursor: "pointer",
            transition: "background 0.15s ease-in-out",
            borderBottom: `1px solid ${__rangeTrackBorderColor}`,
            borderRight: `1px solid ${__rangeTrackBorderColor}`,
            '&:hover': {
                background: __rangeHandleColorHover,
                border: "1px solid white"
            }
        },
    //}
});
