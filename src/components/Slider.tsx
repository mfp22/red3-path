import { styled } from '@stitches/react';

export const Slider = styled('input', {
    //'input[type = "range"].ui - slider': {
        $$rangehandlecolor: "#ffffff",      // !default
        $$rangehandlecolorhover: "#907aff54",       // !default
        $$rangehandlesize: "'12px'", // def 16px        // !default
        $$rangehandleradius: "25%", // def 50%

        $$rangetrackcolor: "#6c48f04d",     // !default
        $$rangetrackheight: "1px", // def 2px       // !default
        $$rangetrackbordercolor: "rgba(108, 72, 240, 0.5)",     // !default

        WebkitAppearance: "none",
        width: "100%", //$$range-label-width: 60px !default; width: calc(100% - (#{$$range-label-width + 10px}));
        height: "$$rangeTrackHeight",
        borderRadius: "5px",
        background: "$$rangeTrackColor",
        outline: "none",
        padding: "0",
        margin: "0",
        cursor: "pointer",

        // Range Handle
        '&::-webkit-slider-thumb': {
            WebkitAppearance: "none",
            width: "$$rangeHandleSize",
            height: "$$rangeHandleSize",
            borderRadius: "$$rangeHandleRadius",
            background: "$$rangeHandleColor",
            cursor: "pointer",
            transition: "all 0.15s ease-in-out",
            border: "1px solid $$rangeTrackColor",
            borderBottom: "1px solid $$rangeTrackBorderColor",
            borderRight: "1px solid $$rangeTrackBorderColor",
            '&:hover': {
                background: "$$rangeHandleColorHover",
                transform: "scale(1.2)",
                border: "1px solid white"
            }
        },
        '&::-moz-range-thumb': {
            width: "$$rangeHandleSize",
            height: "$$rangeHandleSize",
            border: ["0", "1px solid $$rangeTrackColor"],
            borderRadius: "$$rangeHandleRadius",
            background: "$$rangeHandleColor",
            cursor: "pointer",
            transition: "background 0.15s ease-in-out",
            borderBottom: "1px solid $$rangeTrackBorderColor",
            borderRight: "1px solid $$rangeTrackBorderColor",
            '&:hover': {
                background: "$$rangeHandleColorHover",
                border: "1px solid white"
            }
        },
    //}
});

