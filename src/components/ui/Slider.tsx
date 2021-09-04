import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider'; // https://www.radix-ui.com/docs/primitives/components/slider
import { CSS, styled } from '../../stitches.config';
import { useDrag } from 'react-use-gesture';

const defaultStyles = {
    boxSizing: 'border-box',
} as CSS;

const SliderRoot = styled(RadixSlider.Root, {
    ...defaultStyles,
    position: 'relative',
    width: '100%',
    height: '1em',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
});

const SliderTrack = styled(RadixSlider.Track, {
    ...defaultStyles,
    position: 'relative',
    flexGrow: 1,
    height: 4,
    borderRadius: '3px',
    background: '#ffffff40',
});


const SliderRange = styled(RadixSlider.Range, {
    ...defaultStyles,
    position: 'absolute',
    height: '100%',
    background: 'var(--tm-primary-500)',
    border: '1px solid #00000050', outline: '2px solid transparent', 'outline-offset': '2px', //Chrome 93 makes outline as square: outline: '1px solid #00000050',
    borderRadius: '3px',
});

const SliderThumb = styled(RadixSlider.Thumb, {
    ...defaultStyles,
    position: 'relative',
    width: 18,
    height: 18,
    background: 'var(--tm-primary-500)',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',

    border: '1px solid #00000050', outline: '2px solid transparent', 'outline-offset': '2px', //Chrome 93 makes outline as square: outline: '1px solid #00000050',

    //'--active': '0',
    //'&:active': { '--active': '1' },
    '&:hover': { backgroundColor: 'var(--tm-primary-500)' },
    '&:focus': { boxShadow: '0 0 0 5px #0000001c' },
});

const SliderBalloon = styled('div', {
    position: 'absolute',
    margin: '0 0 0 -7px',
    left: 0,
    bottom: '5px',
    width: '32px',
    height: '62px',
    transition: 'transform .2s ease',
    //transition: 'transform .2s ease, opacity 4.2s ease',
    transformOrigin: '50% 90%',
    transform: 'translateY(calc(var(--active, 0) * -5px)) scale(var(--active, 0))',
    //opacity: 'var(--active)',

    fontSize: '.8em',
    textAlign: 'center',
    color: 'var(--tm-primary-50)',

    willChange: 'transform',
    pointerEvents: 'none',
    overflow: 'hidden',
});

function BallonSVG({ value }: { value: number; }) {
    return (
        <div className="relative">
            <svg className="absolute inset-0" viewBox="-2 0 36 62" fill="var(--tm-primary-500)" stroke="#00000050">
                <path d="M16,44.89S7,37.62,4.7,35.32a16,16,0,1,1,22.6,0C25,37.62,16,44.89,16,44.89Z" />
            </svg>
            <div className="relative w-full top-3 left-[-1px]">{value}</div>
        </div>
    );
};

const Slider = React.forwardRef<HTMLSpanElement, RadixSlider.SliderOwnProps & { ariaLabel?: string; }>((props, forwardedRef) => {
    const value = props.value || props.defaultValue || [];
    const { ariaLabel, ...rest } = props;

    const sliderRef = React.useRef<HTMLSpanElement | null>(null);
    React.useImperativeHandle(forwardedRef, () => sliderRef.current!);

    const bind = useDrag(({ event: { type } }) => {
        if (sliderRef.current) {
            const set = type === 'pointerdown' ? 1 : type === 'pointerup' ? 0 : 2 
            set < 2 && (sliderRef.current.style.setProperty('--active', `${set}`));
        }
    });

    return (
        <SliderRoot {...bind()} ref={sliderRef} {...rest}>
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
