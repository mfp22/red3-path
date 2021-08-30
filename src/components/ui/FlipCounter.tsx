import * as React from "react";
import { styled } from "../../stitches.config";
import { animated, useSpring, config } from "@react-spring/web";

type Props = {
    children: number;
};

export const FlipCard: React.FC<Props> = ({ children }) => {
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
};

const usePrevious = (currentValue: number) => {
    const previousValue = React.useRef(0);
    React.useEffect(() => {
        previousValue.current = currentValue;
    }, [currentValue]);
    return previousValue.current;
};

const Container = styled("div")`
  display: grid;
  position: relative;
  grid-template-columns: 140px;
  grid-template-rows: 80px 80px;
  grid-template-areas: "top" "bottom";
  width: 140px;
  height: 160px;
  perspective-origin: 50% 50%;
  perspective: 300px;
  background-color: white;
  font-family: monospace;
`;

const StaticCardTop = styled("div")`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100%;
  grid-area: top;
  overflow: hidden;
  border: 1px solid gray;
  background-color: white;

  span {
    font-size: 80px;
    transform: translateY(40%);
  }
`;

const StaticCardBottom = styled("div")`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100%;
  grid-area: bottom;
  overflow: hidden;
  border: 1px solid gray;
  background-color: white;

  span {
    font-size: 80px;
    transform: translateY(-60%);
  }
`;

const AnimatedCardFront = styled(animated.div)`
  display: flex;
  position: absolute;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 80px;
  overflow: hidden;
  transform-origin: center bottom;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: rotateX(0deg);
  border: 1px solid gray;
  background-color: white;

  span {
    font-size: 80px;
    transform: translateY(40%);
  }
`;

const AnimatedCardBack = styled(animated.div)`
  display: flex;
  position: absolute;
  justify-content: center;
  top: 80px;
  left: 0;
  background-color: white;
  width: 100%;
  height: 80px;
  overflow: hidden;
  transform: rotateX(180deg);
  transform-origin: center top;
  backface-visibility: hidden;
  border: 1px solid gray;
  background-color: white;

  span {
    font-size: 80px;
    transform: translateY(-60%);
  }
`;
