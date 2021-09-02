import React, { useEffect, useRef, useState } from 'react';
import './FlipCard2.scss';

const AnimatedCard = ({ animation, digit }: { animation: string, digit: string }) => {
    return (
        <div className={`flipCard ${animation}`}>
            <span>{digit}</span>
        </div>
    );
};

const StaticCard = ({ position, digit }: { position: string, digit: string }) => {
    return (
        <div className={position}>
            <span>{digit}</span>
        </div>
    );
};

const FlipUnitContainer = ({ digit, shuffle, unit }: { digit: number, shuffle: boolean, unit: string }) => {
    // assign digit values
    let currentDigit = digit;
    let previousDigit = digit - 1;

    // to prevent a negative value
    if (unit !== 'hours') {
        previousDigit = previousDigit === -1 ? 59 : previousDigit;
    }
    else {
        previousDigit = previousDigit === -1 ? 23 : previousDigit;
    }

    let currentDigitStr: string = `${currentDigit}`;
    let previousDigitStr: string = `${previousDigit}`;

    // add zero
    if (currentDigit < 10) {
        currentDigitStr = `0${currentDigit}`;
    }
    if (previousDigit < 10) {
        previousDigitStr = `0${previousDigit}`;
    }

    // shuffle digits
    const digit1 = shuffle ? previousDigitStr : currentDigitStr;
    const digit2 = !shuffle ? previousDigitStr : currentDigitStr;

    // shuffle animations
    const animation1 = shuffle ? 'fold' : 'unfold';
    const animation2 = !shuffle ? 'fold' : 'unfold';

    return (
        <div className={'flipUnitContainer'}>
            <StaticCard
                position={'upperCard'}
                digit={currentDigitStr}
            />
            <StaticCard
                position={'lowerCard'}
                digit={previousDigitStr}
            />
            <AnimatedCard
                digit={digit1}
                animation={animation1}
            />
            <AnimatedCard
                digit={digit2}
                animation={animation2}
            />
        </div>
    );
};

// class component
export function FlipClock() {

    const [state, setState] = useState({
        hours: 0,
        hoursShuffle: true,
        minutes: 0,
        minutesShuffle: true,
        seconds: 0,
        secondsShuffle: true
    });

    const timerID = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
        timerID.current = setInterval(() => updateTime(), 1250);
        return () => {
            clearInterval(timerID.current);
        }
    }, []);
    
    function updateTime() {
        // get new date
        const time = new Date;
        // set time units
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        // on hour chanage, update hours and shuffle state
        if (hours !== state.hours) {
            const hoursShuffle = !state.hoursShuffle;
            setState((v) => ({
                ...v,
                hours,
                hoursShuffle
            }));
        }
        // on minute chanage, update minutes and shuffle state
        if (minutes !== state.minutes) {
            const minutesShuffle = !state.minutesShuffle;
            setState((v) => ({
                ...v,
                minutes,
                minutesShuffle
            }));
        }
        // on second chanage, update seconds and shuffle state
        if (seconds !== state.seconds) {
            const secondsShuffle = !state.secondsShuffle;
            setState((v) => ({
                ...v,
                seconds,
                secondsShuffle: !v.secondsShuffle
            }));
        }
    }

    // state object destructuring
    const {
        hours,
        minutes,
        seconds,
        hoursShuffle,
        minutesShuffle,
        secondsShuffle
    } = state;

    return (
        <div className={'flipClock'}>
            {/* <FlipUnitContainer
                unit={'hours'}
                digit={hours}
                shuffle={hoursShuffle}
            />
            <FlipUnitContainer
                unit={'minutes'}
                digit={minutes}
                shuffle={minutesShuffle}
            /> */}
            <FlipUnitContainer
                unit={'seconds'}
                digit={seconds}
                shuffle={secondsShuffle}
            />
        </div>
    );
}
