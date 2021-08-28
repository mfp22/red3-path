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
    position: 'relative',
    display: 'flex',
    width: 18,
    height: 18,
    background: 'var(--tm-primary-500)',
    borderRadius: '50%',
    cursor: 'pointer',
    outline: '1px solid #00000050',
    '--active': 0,
    '&:hover': { backgroundColor: 'var(--tm-primary-500)' },
    '&:active': { '--active': 1 },
    '&:focus': { boxShadow: '0 0 0 5px #0000001c' },
});

const SliderBalloon = styled('div', {
    position: 'absolute',
    left: 0,
    //top: 0,
    bottom: '3px',
    width: '32px',
    height: '62px',
    //padding: '8px 3px 0',
    margin: '0 0 0 -7px',
    //backgroundColor: 'red',
    transform: 'scale(var(--active))',
    transition: 'transform .2s ease',
    transformOrigin: '50% 90%',
});

function BallonSVG() {
    return (
        <svg width="32" height="62" fill="var(--tm-primary-500)" stroke="#00000050">
            {/* <path d="M27.3 27.3C25 29.6 17 35.8 17 43v3c0 3 2.5 5 3.2 5.8a6 6 0 1 1-8.5 0C12.6 51 15 49 15 46v-3c0-7.2-8-13.4-10.3-15.7A16 16 0 0 1 16 0a16 16 0 0 1 11.3 27.3z" /> */}
            <path d="M15,54V51c0-7.2-8-13.4-10.3-15.7a16,16,0,1,1,22.6,0C25,37.62,17,43.82,17,51v3" />
        </svg>
    );
};

/*
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.95 62"><defs><style>.cls-1{fill:#e6e6e6;}.cls-2{fill:none;stroke:#000;}</style></defs><rect class="cls-1" x="0.47" width="32" height="62"/><path class="cls-2" d="M198.72,97.82v-3c0-7.2-8-13.4-10.3-15.7a16,16,0,1,1,22.6,0c-2.3,2.3-10.3,8.5-10.3,15.7v3" transform="translate(-183.24 -43.82)"/></svg>
*/

const Slider = React.forwardRef<HTMLSpanElement, RadixSlider.SliderOwnProps & { ariaLabel?: string; }>((props, forwardedRef) => {
    const value = props.value || props.defaultValue || [];
    const { ariaLabel, ...rest } = props;
    return (
        <SliderRoot {...rest} ref={forwardedRef}>
            <SliderTrack>
                <SliderRange />
            </SliderTrack>
            {value.map((_, i) => <SliderThumb key={i} aria-label={ariaLabel}>
                <SliderBalloon>
                    <BallonSVG />
                </SliderBalloon>
            </SliderThumb>)}
        </SliderRoot>
    );
});

export default Slider;
