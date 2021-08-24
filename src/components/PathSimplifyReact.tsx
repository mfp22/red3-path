import React, { useCallback, useContext } from 'react';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';
import { ControlPoint, CpType, getControlPoints, getPoints, parsePathString, pathToAbsolute, XY } from '../utils/svg-path-cpts';
import { withDigits } from '../utils/numbers';
import ToogleButtons from './ToogleButtons';
import { Slider } from './Slider';

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
    rRaw = 5,               // raw points radius
    rCpt = 13,              // smooth points radius
    wHandle = 8,            // square control points width
    rHandle = 4,            // circle control points radius
    handleTextOfsX = 15,    // control point x text offset
    handleTextOfsY = 0,     // control point y text offset
    wLineLower = 11,        // lower line width
    wLineUpper = 7,         // upper line width
}

function RenderRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: "blue", fill: "purple", ...rest };
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
    rest = { r: SIZES.rCpt, stroke: "red", fill: "#ffa50080", ...rest }; // orange 50%
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
    rest = { stroke: "maroon", strokeWidth: '1', fill: "tomato", ...rest };
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
    rest = { stroke: "maroon", strokeWidth: '1', fill: "tomato", ...rest };
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
    const { points, setPoints, tolerance, setTolerance, showRaw, showPts, showCtr, } = useContext(PathSimplifyContext);

    const addPoint = useCallback(debounce((pt: [number, number]) => setPoints(prev => [...prev, pt]), 50), []);

    const bind = useDrag((event) => {
        //if (event.event.type === 'pointerdown') {}

        if (event.dragging && event.buttons === 1) {
            addPoint(pointer(event.event, svgRef.current));
        }

        // if (event.event.type === 'pointerup') {
        //     if (points.length > 1) {
        //         setPoints(prev => [...prev]);
        //     }
        // }
    });

    const path = React.useMemo(() => getPath(points, tolerance), [points, tolerance]);
    const controlPoints = React.useMemo(() => getPathPoints(path), [path]);

    return (
        <div className="relative text-gray-700 select-none 
            resize overflow-hidden bg-red-300"
        >
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300 w-full h-full">
                <path fill="none" stroke="red" strokeWidth={SIZES.wLineLower} d={path} />
                <path fill="none" stroke="orange" strokeWidth={SIZES.wLineUpper} d={path} />
                {showRaw && <RenderRawPoints pts={points} />}
                {showPts && <RenderCpts pts={controlPoints.points} />}
                {showCtr && <RenderCptsHandlesSquares cpts={controlPoints.controls} />}
            </svg>

            {/* Controls */}
            <div className="ml-2 mb-2 absolute bottom-0 flex items-center space-x-4">
                <button className="p-2 border border=gray-400 rounded shadow" onClick={() => setPoints([])}>Clear</button>
                {/* Tolerance range and Points stats */}
                <div className="pb-1 flex flex-col text-sm">
                    {/* Tolerance */}
                    <div className="flex items-center space-x-2">
                        <div className="">Tolerance:</div>
                        <input
                            className="w-32" type="range" value={tolerance} onChange={(event) => setTolerance(+withDigits(+event.target.value, 0))}
                            min={0} max={400} step={0.01}
                        />
                        <div className="w-12">{tolerance}</div>
                    </div>
                    
                    <div className="h-4">
                        <Slider type="range"/> 
                    </div>

                    <div className="">Points: {points.length} -&gt; {controlPoints.points.length}</div>
                </div>
                <ToogleButtons />
            </div>
        </div>
    );
};

export default PathSimplifyReact;
