import React from 'react';
import * as Slider from "@radix-ui/react-slider";

import { CSS, styled } from "../stitches.config";
import { SliderOwnProps, SliderPrimitive } from '@radix-ui/react-slider';

const defaultStyles = {
    boxSizing: "border-box",
} as CSS;

export const SliderRoot = styled(Slider.Root, {
    ...defaultStyles,
    display: "flex",
    position: "relative",
    alignItems: "center",
    userSelect: "none",
    touchAction: "none",
    width: "100%",
    height: "1em",
});

export const SliderTrack = styled(Slider.Track, {
    ...defaultStyles,
    background: "linear-gradient(90deg, hsl($primaryHSL / 0.15) 0%, hsl($primaryHSL / 0) 101.35%), $elevation2",
    position: "relative",
    flexGrow: 1,
    height: 10,
    borderRadius: "$full",
});


export const SliderRange = styled(Slider.Range, {
    ...defaultStyles,
    position: "absolute",
    background: "$primary100",
    borderRadius: "$full",
    height: "100%",
});

export const SliderThumb = styled(Slider.Thumb, {
    ...defaultStyles,
    display: "flex",
    width: 24,
    height: 24,
    background: "$text100",
    borderRadius: "$full",
});

export const Slider2: SliderPrimitive = React.forwardRef<HTMLSpanElement, SliderOwnProps>((props, forwardedRef) => {
    const value = props.value || props.defaultValue  || []; // https://www.radix-ui.com/docs/primitives/components/slider
    return (
        <Slider.Slider {...props} ref={forwardedRef}>
            <Slider.Track>
                <Slider.Range />
            </Slider.Track>
            {value.map((_, i) => (
                <SliderThumb key={i} />
            ))}
        </Slider.Slider>
    );
});
