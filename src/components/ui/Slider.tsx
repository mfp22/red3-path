import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider'; // https://www.radix-ui.com/docs/primitives/components/slider
import { CSS, styled } from '../../stitches.config';

const defaultStyles = {
    boxSizing: 'border-box',
} as CSS;

const SliderRoot = styled(RadixSlider.Root, {
    ...defaultStyles,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    width: '100%',
    height: '1em',
});

const SliderTrack = styled(RadixSlider.Track, {
    ...defaultStyles,
    background: '#ffffff40',
    position: 'relative',
    flexGrow: 1,
    height: 3,
    borderRadius: '3px',
});


const SliderRange = styled(RadixSlider.Range, {
    ...defaultStyles,
    position: 'absolute',
    background: 'var(--tm-primary-500)',
    outline: '1px solid #00000050',
    borderRadius: '3px',
    height: '100%',
});

const SliderThumb = styled(RadixSlider.Thumb, {
    ...defaultStyles,
    display: 'flex',
    width: 18,
    height: 18,
    background: 'var(--tm-primary-500)',
    borderRadius: '50%',
    cursor: 'pointer',
    outline: '1px solid #00000050',
    '&:hover': { backgroundColor: 'var(--tm-primary-500)' },
    '&:focus': { boxShadow: '0 0 0 5px #0000001c' },
});

type SliderOwnPropsPlus = RadixSlider.SliderOwnProps & {
    ariaLabel: string;
}

type AA = RadixSlider.SliderPrimitive;

let a: ForwardRefComponent<'span', SliderOwnPropsPlus> = {}

const Slider: AA = React.forwardRef<HTMLSpanElement, AA>((props, forwardedRef) => {
    const value = props.value || props.defaultValue || [];
    const { 'area-label': areaLabel, ...rest } = props;
    console.log('props', props);

    return (
        <SliderRoot {...rest} ref={forwardedRef}>
            <SliderTrack>
                <SliderRange />
            </SliderTrack>
            {value.map((_, i) => <SliderThumb aria-label={areaLabel} key={i} />)}
        </SliderRoot>
    );
});

export default Slider;
