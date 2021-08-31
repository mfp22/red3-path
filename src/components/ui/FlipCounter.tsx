import * as React from "react";
import { styled } from "../../stitches.config";
import { animated, useSpring, config } from "@react-spring/web";

const Container = styled('div', {
    position: 'relative',

    width: '140px',
    height: '160px',
    perspectiveOrigin: '50% 50%',
    perspective: '300px',
    backgroundColor: 'white',
    fontFamily: 'monospace',

    display: 'grid',
    gridTemplateRows: '80px 80px',
    gridTemplateColumns: '140px',
    gridTemplateAreas: '"top" "bottom"',
});

// Static

const StaticCardTop = styled('div', {
    gridArea: 'top',
    // + different span transform

    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    border: '1px solid gray',
    backgroundColor: 'white',

    display: 'flex',
    justifyContent: 'center',

    '& span': {
        fontSize: '80px', transform: 'translateY(40%)'
    }
});

const StaticCardBottom = styled('div', {
    gridArea: 'bottom',
    // + different span transform

    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    border: '1px solid gray',
    backgroundColor: 'white',

    display: 'flex',
    justifyContent: 'center',

    '& span': {
        fontSize: '80px', transform: 'translateY(-60%)'
    }
});

// Animated

const AnimatedCardFront = styled(animated.div, {
    top: '0',
    transformOrigin: 'center bottom',
    transformStyle: 'preserve-3d',
    // + different span transform

    position: 'absolute',
    left: '0',
    width: '100%',
    height: '80px',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    transform: 'rotateX(0deg)',
    border: '1px solid gray',
    backgroundColor: 'white',

    display: 'flex',
    justifyContent: 'center',

    '& span': {
        fontSize: '80px',
        transform: 'translateY(40%)'
    }
});

const AnimatedCardBack = styled(animated.div, {
    top: '80px',
    transformOrigin: 'center top',
    // + different span transform

    position: 'absolute',
    left: '0',
    width: '100%',
    height: '80px',
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    transform: 'rotateX(180deg)',
    border: '1px solid gray',
    backgroundColor: 'white',

    display: 'flex',
    justifyContent: 'center',

    '& span': {
        fontSize: '80px',
        transform: 'translateY(-60%)'
    }
});

// Main

function usePrevious(currentValue: number) {
    const previousValue = React.useRef(0);
    React.useEffect(() => {
        previousValue.current = currentValue;
    }, [currentValue]);
    return previousValue.current;
}

export function FlipCard({ children }: { children: number; }) {
    const [currentNumber, setCurrentNumber] = React.useState(0);
    const previousNumber = usePrevious(currentNumber);

    React.useEffect(() => {
        setCurrentNumber(children);
    }, [children]);

    const frontCardAnimation = useSpring({
        from: { transform: "rotateX(0deg)" },
        to: { transform: "rotateX(-180deg)" },
        delay: 0,
        config: config.slow,
        reset: true
    });

    const backCardAnimation = useSpring({
        from: { transform: "rotateX(180deg)" },
        to: { transform: "rotateX(0deg)" },
        delay: 0,
        config: config.slow,
        reset: true
    });

    return (
        <Container>
            <StaticCardTop>
                <span>{currentNumber}</span>
            </StaticCardTop>
            <StaticCardBottom>
                <span>{previousNumber}</span>
            </StaticCardBottom>

            <AnimatedCardFront style={frontCardAnimation}>
                <span>{previousNumber}</span>
            </AnimatedCardFront>
            <AnimatedCardBack style={backCardAnimation}>
                <span>{currentNumber}</span>
            </AnimatedCardBack>
        </Container>
    );
}
