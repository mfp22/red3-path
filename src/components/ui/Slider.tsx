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
    bottom: '5px',
    margin: '0 0 0 -7px',
    //padding: '8px 3px 0',
    width: '32px',
    height: '62px',
    //transform: 'translateY(calc(var(--active) * -40px)) scale(var(--active)) translateY(calc(var(--active) * 40px))',
    //transform: 'translateY(calc(var(--active) * -40px))',
    //transform: 'scale(var(--active))',
    transform: 'translateY(calc(var(--active) * -5px)) scale(var(--active))',
    //opacity: 'calc(var(--active) * .5)',
    //opacity: 'var(--active)',
    transition: 'all .2s ease',
    transformOrigin: '50% 90%',

    //fontSize: 'calc(100% - 2 / 5 * 0.2em)',
    fontSize: '.8em',
    //fontWeight: 'bold',
    textAlign: 'center',
    color: 'var(--tm-primary-50)',

    willChange: 'transform',
    pointerEvents: 'none',
    overflow: 'hidden',
});

function BallonSVG({ value }: { value: number; }) {
    return (
        <div className="relative">
            <svg className="absolute inset-0" fill="var(--tm-primary-500)" stroke="#00000050">
                <path d="M16,44.89S7,37.62,4.7,35.32a16,16,0,1,1,22.6,0C25,37.62,16,44.89,16,44.89Z" />
            </svg>
            <div className="relative w-full top-3 left-[-1px]">{value}</div>
        </div>
    );
};

const Slider = React.forwardRef<HTMLSpanElement, RadixSlider.SliderOwnProps & { ariaLabel?: string; }>((props, forwardedRef) => {
    const value = props.value || props.defaultValue || [];
    const { ariaLabel, ...rest } = props;
    return (
        <SliderRoot {...rest} ref={forwardedRef}>
            <SliderTrack>
                <SliderRange />
            </SliderTrack>
            {value.map((_, i) => (
                <SliderThumb key={i} aria-label={ariaLabel}>
                    <SliderBalloon>
                        <BallonSVG value={_} />
                    </SliderBalloon>
                </SliderThumb>
            ))}
        </SliderRoot>
    );
});

export default Slider;
