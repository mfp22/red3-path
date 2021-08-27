import React, { useCallback, useContext } from 'react';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';
import { ControlPoint, CpType, getControlPoints, getPoints, parsePathString, pathToAbsolute, XY } from '../utils/svg-path-cpts';
import { clamp, withDigits } from '../utils/numbers';
import ToggleButtons from './ToggleButtons';
import Slider from './ui/Slider';

function getPath(points: [number, number][], tolerance: number) {
    //console.log(`points\n${JSON.stringify(points.map(pt => [+withDigits(pt[0], 0), +withDigits(pt[1], 0)]))}`);

    return points.length > 1 ? simplifyPath(points, { tolerance: tolerance }) : '';
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

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const { points, setPoints, tolerance, setTolerance, showLine, showRaw, showPts, showCtr, } = useContext(PathSimplifyContext);

    const addPoint = useCallback(debounce((pt: [number, number]) => setPoints(prev => [...prev, pt]), 50), []);

    const bind = useDrag((event) => {
        //if (event.event.type === 'pointerdown') {}

        if (event.dragging && event.buttons === 1) {
            // let pt = pointer(event, ref.current).map(coord => +withDigits(coord, 0)) as [number, number];
            let pt = pointer(event.event, svgRef.current);
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

    const path = React.useMemo(() => getPath(points, tolerance), [points, tolerance]);
    const controlPoints = React.useMemo(() => getPathPoints(path), [path]);

    const svgWidth = 500;
    const svgHeight = 500;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[600px] lg:max-w-none gap-4 text-gray-700 select-none">
            {/* Tolerance range and Points stats */}
            <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold">
                <div className="">Points: {points.length} -&gt; {controlPoints.points.length}</div>
            </div>

            {/* Canvas */}
            <svg ref={svgRef} {...bind()} viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="col-span-1 lg:col-span-2 min-w-[400px] w-full h-full bg-primary-300 border-primary-600 border-8 border-opacity-50"
            >
                {showPts && <RenderCpts pts={controlPoints.points} />}
                {showCtr && <RenderCptsHandlesSquares cpts={controlPoints.controls} />}
                {showRaw && <RenderRawPoints pts={points} />}
                {showLine && <>
                    <path fill="none" stroke={COLORS.slineLower} strokeWidth={SIZES.wLineLower} d={path} />
                    <path fill="none" stroke={COLORS.slineUpper} strokeWidth={SIZES.wLineUpper} d={path} />
                </>}
            </svg>

            {/* Controls */}
            <div className="lg:min-w-[20rem] p-4 space-y-4 bg-primary-300 text-sm rounded border-primary-600 border-8 border-opacity-50">
                {/* Tolerance */}
                <div className="flex items-center space-x-2">
                    <div className="">Tolerance:</div>
                    <div className="flex-1 h-3"> {/* aria-label="Tolerance control" */}
                        <Slider min={0} max={400} step={0.1} value={[tolerance]} onValueChange={(value: number[]) => setTolerance(+withDigits(value[0], 0))} aria-label="Tolerance control"/>
                    </div>
                    <div className="">{tolerance}</div>
                </div>

                <div className="flex justify-between">
                    <ToggleButtons />
                    <button className="p-1 border border-primary-700 rounded shadow active:scale-[.97]" onClick={() => setPoints([])} title="Clear canvas points">Clear</button>
                </div>
            </div>
        </div>
    );
};

export default PathSimplifyReact;
