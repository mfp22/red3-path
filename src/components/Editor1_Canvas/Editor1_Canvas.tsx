import React, { useCallback } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  buildResultAtom,
  curveParams,
  showOptions,
  svgHeight,
  svgWidth,
} from '@/store/store';
import { debounce } from '@/utils/debounce';
import { clamp, withDigits } from '@/utils/numbers';
import { pointer } from '@/utils/pointer';
import { ControlPoint, CpType, XY } from '@/utils/svg-path-cpts';
import { useDrag } from '@use-gesture/react';
import styles from './Editor1_Canvas.module.scss';

const enum SIZES {
  rawRadius = 2, // raw point radius
  cptRadius = 4, // smooth point radius
  stepRadius = 2, // step point radius

  handleWidth = 8, // square control point width
  handleRadius = 4, // circle control point radius
  handleTextOfsX = cptRadius + 3, // control point x text offset
  handleTextOfsY = 0, // control point y text offset
}

function RenderRawPoints({
  pts,
  ...rest
}: {
  pts: [number, number][];
} & React.SVGAttributes<SVGElement>) {
  return (
    <g className={styles.pointRaw} data-row {...rest}>
      {pts.map(([x, y], idx) => (
        <circle cx={x} cy={y} r={SIZES.rawRadius} key={idx}>
          <title>
            Index: {idx} Location: {withDigits(x, 0)} x{' '}
            {withDigits(y, 0)}
          </title>
        </circle>
      ))}
    </g>
  );
}

function RenderCpts({
  pts,
  ...rest
}: { pts: XY[] } & React.SVGAttributes<SVGElement>) {
  return (
    <g>
      {pts.map(({ x, y }, index) => (
        <React.Fragment key={index}>
          <circle
            cx={x}
            cy={y}
            r={SIZES.cptRadius}
            className={styles.pointCtrl}
            {...rest}
          >
            <title>
              Index: {index}: Location: {withDigits(x, 0)} x{' '}
              {withDigits(y, 0)}
            </title>
          </circle>

          <text
            x={x + SIZES.handleTextOfsX}
            y={y + SIZES.handleTextOfsY}
            fontSize="7"
            stroke="none"
          >
            {index}
          </text>
        </React.Fragment>
      ))}
    </g>
  );
}

function RenderCptsHandlesSquares({
  cpts,
  ...rest
}: { cpts: ControlPoint[] } & React.SVGAttributes<SVGElement>) {
  const ctrlPointTitle = (cpt: ControlPoint) =>
    `Command ${cpt.n}: ${cpt.i}: Location: ${withDigits(
      cpt.cp.x,
      0,
    )} x ${withDigits(cpt.cp.y, 0)}`;
  return (
    <g className={styles.handle} {...rest}>
      {cpts.map((cpt, index) => (
        <React.Fragment key={index}>
          <rect
            x={cpt.cp.x - SIZES.handleWidth / 2}
            y={cpt.cp.y - SIZES.handleWidth / 2}
            width={SIZES.handleWidth}
            height={SIZES.handleWidth}
            fill={cpt.t === CpType.computed ? 'none' : rest.fill}
          >
            {/* <title>{ctrlPointTitle(cpt)}</title> */}
          </rect>

          <circle
            cx={cpt.cp.x}
            cy={cpt.cp.y}
            r={SIZES.handleRadius}
            fill={cpt.t === CpType.computed ? 'none' : rest.fill}
          >
            <title>{ctrlPointTitle(cpt)}</title>
          </circle>

          <line
            x1={cpt.pt.x}
            y1={cpt.pt.y}
            x2={cpt.cp.x}
            y2={cpt.cp.y}
            strokeDasharray="2 2"
          />
        </React.Fragment>
      ))}
    </g>
  );
}

function RenderStepRawPoints({
  pts,
  ...rest
}: {
  pts: [number, number][];
} & React.SVGAttributes<SVGElement>) {
  return (
    <g className={styles.pointStep} {...rest}>
      {pts.map(([x, y], idx) => (
        <circle cx={x} cy={y} r={SIZES.stepRadius} key={idx}>
          <title>
            Index: {idx} Location: {withDigits(x, 0)} x{' '}
            {withDigits(y, 0)}
          </title>
        </circle>
      ))}
    </g>
  );
}

export function Editor1_Canvas() {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const [points, setPoints] = useAtom(curveParams.pointsAtom);

  const showLine = useAtomValue(showOptions.showLineAtom);
  const showRaw = useAtomValue(showOptions.showRawAtom);
  const showPts = useAtomValue(showOptions.showPtsAtom);
  const showCtr = useAtomValue(showOptions.showCtrAtom);

  const addPoint = useCallback(
    debounce(
      (pt: [number, number]) => setPoints(prev => [...prev, pt]),
      50,
    ),
    [],
  );

  const bind = useDrag(({ event, dragging, buttons }) => {
    //if (event.event.type === 'pointerdown') {}

    if (dragging && buttons === 1) {
      // let pt = pointer(event, ref.current).map(coord => +withDigits(coord, 0)) as [number, number];
      let pt = pointer(event as PointerEvent, svgRef.current);
      pt[0] = clamp(
        pt[0],
        SIZES.cptRadius,
        svgWidth - SIZES.cptRadius,
      );
      pt[1] = clamp(
        pt[1],
        SIZES.cptRadius,
        svgHeight - SIZES.cptRadius,
      );
      addPoint(pt);
    }

    // if (event.event.type === 'pointerup') {
    //     if (points.length > 1) {
    //         setPoints(prev => [...prev]);
    //     }
    // }
  });

  const { path, controlPoints, stepPoints } =
    useAtomValue(buildResultAtom);

  return (
    <div className="col-span-1 lg:col-span-2">
      <svg
        ref={svgRef}
        {...bind()}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full bg-primary-300 border-primary-600 border-opacity-50 border-8 touch-none cursor-tm-point"
      >
        {showPts && <RenderCpts pts={controlPoints.points} />}
        {showCtr && (
          <RenderCptsHandlesSquares
            cpts={controlPoints.controls}
          />
        )}
        {showRaw && <RenderRawPoints pts={points} />}
        {showLine && (
          <>
            <path className={styles.lineLower} d={path} />
            <path className={styles.lineUpper} d={path} />
          </>
        )}

        <RenderStepRawPoints pts={stepPoints} />
      </svg>
    </div>
  );
}
