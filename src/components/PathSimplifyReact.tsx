import React, { useCallback, useContext } from 'react';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from '@use-gesture/react';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';
import { ControlPoint, CpType, getControlPoints, getPoints, parsePathString, pathToAbsolute, XY } from '../utils/svg-path-cpts';
import { clamp, withDigits } from '../utils/numbers';
import ToggleButtons from './ToggleButtons';
import Slider from './ui/Slider';
import Result from './ui/ResultDisplay';
import ResultDisplayProduction from './ui/ResultDisplayProduction';
import HeroInfo from './ui/HeroInfo';
import Hero from './ui/Hero';
import { SVG } from '@svgdotjs/svg.js';

function getPath(points: [number, number][], tolerance: number, precision: number) {
    //console.log(`points\n${JSON.stringify(points.map(pt => [+withDigits(pt[0], 0), +withDigits(pt[1], 0)]))}`);

    return points.length > 1 ? simplifyPath(points, { tolerance, precision }) : '';
}

function getPathPoints(pathStr: string) {
    const tuples = pathToAbsolute(parsePathString(pathStr));
    return {
        points: tuples.length > 1 ? getPoints(tuples) : [],
        controls: tuples.length > 1 ? getControlPoints(tuples) : [],
    };
}

const enum SIZES {
    rRaw = 5,               // raw point radius
    rCpt = 13,              // smooth point radius
    wHandle = 8,            // square control point width
    rHandle = 4,            // circle control point radius
    handleTextOfsX = rCpt + 3,    // control point x text offset
    handleTextOfsY = 0,     // control point y text offset
    wLineLower = 5,         // lower line width
    wLineUpper = 2,         // upper line width
}

const enum COLORS {
    sRaw = 'blue',          // raw point stroke
    fRaw = '#0085ff',       // raw point fill
    sCpt = 'red',           // smooth point stroke
    fCpt = '#ffa500',       // smooth point fill
    sHandle = 'maroon',     // circle control point handle stroke
    fHandle = 'tomato',     // circle control point handle fill
    slineLower = '#ff8422', // lower line stroke
    slineUpper = '#ffdb00', // upper line stroke
}

function RenderRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.sRaw, fill: COLORS.fRaw, ...rest };
    return (<g {...rest}>
        {pts.map((pt, idx) => {
            return <circle cx={pt[0]} cy={pt[1]} r={SIZES.rRaw} key={idx} >
                <title>Index: {idx} Location: {withDigits(pt[0], 0)} x {withDigits(pt[1], 0)}</title>
            </circle>;
        })}

        {/* {pts.map((xy, index) => <React.Fragment key={index}>
            <circle cx={xy.x} cy={xy.y} {...rest}>
                <title>{index}: x:{xy.x} y: {xy.y}</title>
            </circle>
            <text x={xy.x + 7} y={xy.y} fontSize="7" stroke="none" >{index}</text>
        </React.Fragment>)} */}
    </g>);
}

function RenderStepRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.sRaw, fill: 'red', ...rest };
    return (<g {...rest}>
        {pts.map((pt, idx) => {
            return <circle cx={pt[0]} cy={pt[1]} r={SIZES.rRaw + 5} key={idx} >
                <title>Index: {idx} Location: {withDigits(pt[0], 0)} x {withDigits(pt[1], 0)}</title>
            </circle>;
        })}
    </g>);
}

function RenderCpts({ pts, ...rest }: { pts: XY[]; } & React.SVGAttributes<SVGElement>) {
    rest = { r: SIZES.rCpt, stroke: COLORS.sCpt, fill: COLORS.fCpt, ...rest }; // orange 50%
    return (<g>
        {pts.map((xy, index) => <React.Fragment key={index}>
            <circle cx={xy.x} cy={xy.y} {...rest}>
                <title>Index: {index}: Location: {withDigits(xy.x, 0)} x {withDigits(xy.y, 0)}</title>
            </circle>
            <text x={xy.x + SIZES.handleTextOfsX} y={xy.y + SIZES.handleTextOfsY} fontSize="7" stroke="none" >{index}</text>
        </React.Fragment>)}
    </g>);
}

function RenderCptsHandlesSquares({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.sHandle, fill: COLORS.fHandle, strokeWidth: '1', ...rest };
    return (<g {...rest}>
        {cpts.map((cpt, index) =>
            <React.Fragment key={index}>
                <rect x={cpt.cp.x - SIZES.wHandle / 2} y={cpt.cp.y - SIZES.wHandle / 2} width={SIZES.wHandle} height={SIZES.wHandle} fill={cpt.t === CpType.computed ? 'none' : rest.fill}>
                    <title>Command {cpt.n}: {cpt.i}: Location: {withDigits(cpt.cp.x, 0)} x {withDigits(cpt.cp.y, 0)}</title>
                </rect>
                <line x1={cpt.pt.x} y1={cpt.pt.y} x2={cpt.cp.x} y2={cpt.cp.y} strokeDasharray="2 2" />
            </React.Fragment>
        )}
    </g>);
}

function RenderCptsHandlesCyrcles({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: COLORS.sHandle, fill: COLORS.fHandle, strokeWidth: '1', ...rest };
    return (<g {...rest}>
        {cpts.map((cpt, index) =>
            <React.Fragment key={index}>
                <circle cx={cpt.cp.x} cy={cpt.cp.y} r={SIZES.rHandle} fill={cpt.t === CpType.computed ? 'none' : rest.fill}>
                    <title>Command {cpt.n}: {cpt.i}: x:{withDigits(cpt.cp.x)} y: {withDigits(cpt.cp.y)}</title>
                </circle>
                <line x1={cpt.pt.x} y1={cpt.pt.y} x2={cpt.cp.x} y2={cpt.cp.y} strokeDasharray="2 2" />
            </React.Fragment>
        )}
    </g>);
}

interface PathSimplifyReactProps {
}

function svgCalcStepPoints(pathStr: string, points: number, svgWidth: number, svgHeight: number): [number, number][] { //TODO: N points or % ?
    if (points <= 0) {
        return [];
    }

    const draw = SVG().size(svgWidth, svgHeight);
    const path = draw.path(pathStr);

    const pathLength = path.length();
    if (!pathLength) {
        return [];
    }
    const step = pathLength / points;

    const res: [number, number][] = [];
    for (let i = 0; i <= pathLength; i = i + step) {
        let pt = path.pointAt(i);
        res.push([pt.x, pt.y]);
    }
    return res;
}

function SliderTolerance() {
    const { tolerance, setTolerance, } = useContext(PathSimplifyContext);
    const setToleranceDebounced = useCallback(debounce((v: number) => setTolerance(v)), []);
    return (
        <div className="flex items-center space-x-2">
            <div className="min-w-[3.7rem]" title="Path tolerance">Tolerance</div>
            <div className="flex-1 h-3">
                <Slider min={0} max={400} step={0.1} value={[tolerance]} onValueChange={(value: number[]) => setToleranceDebounced(+withDigits(value[0], 0))} ariaLabel="Tolerance control" />
            </div>
            <div className="">{tolerance}</div>
        </div>
    );
}

function SliderStepPoints() {
    const { nStepPoints, setNStepPoints, } = useContext(PathSimplifyContext);
    const setNSetPointsDebounced = useCallback(debounce((cnt: number) => setNStepPoints(cnt)), []);
    return (
        <div className="flex items-center space-x-2">
            <div className="min-w-[3.7rem]" title="Precision of numbers on a smooth path">Steps</div>
            <div className="flex-1 h-3">
                <Slider min={0} max={100} step={1} value={[nStepPoints]} onValueChange={(value: number[]) => setNSetPointsDebounced(value[0])} ariaLabel="Number of step points" />
            </div>
            <div className="">{nStepPoints}</div>
        </div>
    );
}

function SliderPrecision() {
    // Precision of output path numbers.
    // Precision range control has effect only on the output, so we don't need it.
    const { precision, setPrecision, } = useContext(PathSimplifyContext);
    return (
        <div className="flex items-center space-x-2">
            <div className="min-w-[3.7rem]" title="Precision of numbers on a smooth path">Precision</div>
            <div className="flex-1 h-3">
                <Slider min={0} max={9} step={1} value={[precision]} onValueChange={(value: number[]) => setPrecision(+withDigits(value[0], 0))} ariaLabel="Precision control" />
            </div>
            <div className="">{precision}</div>
        </div>
    );
}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgWidth = 500;
    const svgHeight = 500;

    const svgRef = React.useRef<SVGSVGElement>(null);
    const { points, setPoints, tolerance, precision, nStepPoints, showLine, showRaw, showPts, showCtr, } = useContext(PathSimplifyContext);

    const addPoint = useCallback(debounce((pt: [number, number]) => setPoints(prev => [...prev, pt]), 50), []);

    const bind = useDrag(({event, dragging, buttons}) => {
        //if (event.event.type === 'pointerdown') {}

        if (dragging && buttons === 1) {
            // let pt = pointer(event, ref.current).map(coord => +withDigits(coord, 0)) as [number, number];
            let pt = pointer(event as PointerEvent, svgRef.current);
            pt[0] = clamp(pt[0], SIZES.rCpt, svgWidth - SIZES.rCpt);
            pt[1] = clamp(pt[1], SIZES.rCpt, svgHeight - SIZES.rCpt);
            addPoint(pt);
        }

        // if (event.event.type === 'pointerup') {
        //     if (points.length > 1) {
        //         setPoints(prev => [...prev]);
        //     }
        // }
    });

    const path = React.useMemo(() => getPath(points, tolerance, precision), [points, tolerance, precision]);
    const controlPoints = React.useMemo(() => getPathPoints(path), [path]);
    const stepPoints = React.useMemo(() => svgCalcStepPoints(path, nStepPoints, svgWidth, svgHeight), [path, nStepPoints]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[420px] md:max-w-[480px] lg:max-w-full gap-4 text-gray-700 select-none">
            {/* Hero and instructions */}
            <div className="col-span-full my-0 md:my-4 lg:my-0 hidden sm:grid auto-cols-fr">
                <Hero className="h-12 md:h-16 text-primary-900 opacity-75 md:opacity-50" />
                <HeroInfo className="text-sm md:text-lg text-primary-100 opacity-90" />
            </div>

            {/* Canvas */}
            <div className="col-span-1 lg:col-span-2">
                <svg ref={svgRef} {...bind()} viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-full bg-primary-300 border-primary-600 border-8 border-opacity-50 touch-none"
                >
                    {showPts && <RenderCpts pts={controlPoints.points} />}
                    {showCtr && <RenderCptsHandlesSquares cpts={controlPoints.controls} />}
                    {showRaw && <RenderRawPoints pts={points} />}
                    {showLine && <>
                        <path fill="none" stroke={COLORS.slineLower} strokeWidth={SIZES.wLineLower} d={path} />
                        <path fill="none" stroke={COLORS.slineUpper} strokeWidth={SIZES.wLineUpper} d={path} />
                    </>}
                    <RenderStepRawPoints pts={stepPoints} />
                </svg>
            </div>

            {/* Controls */}
            <div className="lg:min-w-[20rem] p-4 space-y-4 bg-primary-300 text-sm border-primary-600 border-8 border-opacity-50">
                <SliderTolerance />
                <SliderStepPoints />
                {/* <SliderPrecision /> */}

                <div className="flex justify-between">
                    <ToggleButtons />
                    <button className="p-1 border border-primary-700 rounded shadow active:scale-[.97]" onClick={() => setPoints([])} title="Clear canvas points">Clear</button>
                </div>
            </div>

            {/* In and out points stats */}
            <div className="col-span-full">
                <ResultDisplayProduction pointsSrc={points.length} pointsDst={controlPoints.points.length} />
                {/* <Result pointsSrc={points.length} pointsDst={controlPoints.points.length} /> */}
            </div>
        </div>
    );
};

export default PathSimplifyReact;
