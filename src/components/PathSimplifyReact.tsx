import React, { useCallback, useContext } from 'react';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';
import { ControlPoint, CpType, getControlPoints, getPoints, parsePathString, pathToAbsolute, XY } from '../utils/svg-path-cpts';
import { withDigits } from '../utils/numbers';

function getPath(points: [number, number][], tolerance: number) {
    console.log(`points\n${JSON.stringify(points.map(pt => [+withDigits(pt[0], 0), +withDigits(pt[1], 0)]))}`);

    return points.length > 1 ? simplifyPath(points, { tolerance: tolerance }) : '';
}

function getPathPoints(pathStr: string) {
    const tuples = pathToAbsolute(parsePathString(pathStr));
    return {
        points: tuples.length > 1 ? getPoints(tuples) : [],
        controls: tuples.length > 1 ? getControlPoints(tuples) : [],
    };
}

function RenderRawPoints({ pts, ...rest }: { pts: [number, number][]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: "blue", fill: "purple", ...rest };
    return (<g {...rest}>
        {pts.map((pt, idx) => {
            return <circle cx={pt[0]} cy={pt[1]} r={2} key={idx} >
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
    rest = { r: "7", stroke: "red", fill: "#ffa50080", ...rest }; // orange 50%
    return (<g>
        {pts.map((xy, index) => <React.Fragment key={index}>
            <circle cx={xy.x} cy={xy.y} {...rest}>
                <title>Index: {index}: Location: {withDigits(xy.x, 0)} x {withDigits(xy.y, 0)}</title>
            </circle>
            <text x={xy.x + 7} y={xy.y} fontSize="7" stroke="none" >{index}</text>
        </React.Fragment>)}
    </g>);
}

function RenderCptsHandlesSquares({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
    rest = { stroke: "maroon", strokeWidth: '1', fill: "tomato", ...rest };
    const enum C {
        width = 8
    }
    return (<g {...rest}>
        {cpts.map((cpt, index) =>
            <React.Fragment key={index}>
                <rect x={cpt.cp.x - C.width / 2} y={cpt.cp.y - C.width / 2} width={C.width} height={C.width} fill={cpt.t === CpType.computed ? 'none' : rest.fill}>
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
                <circle cx={cpt.cp.x} cy={cpt.cp.y} r="4" fill={cpt.t === CpType.computed ? 'none' : rest.fill}>
                    <title>Command {cpt.n}: {cpt.i}: x:{withDigits(cpt.cp.x)} y: {withDigits(cpt.cp.y)}</title>
                </circle>
                <line x1={cpt.pt.x} y1={cpt.pt.y} x2={cpt.cp.x} y2={cpt.cp.y} strokeDasharray="2 2" />
            </React.Fragment>
        )}
    </g>);
}

interface PathSimplifyReactProps {
}

function ToogleButton({ children, pressed, onClick, title }: { children: React.ReactNode; pressed: boolean; onClick: () => void; title: string; }) {
    return (
        <div
            className={`w-8 h-8 border rounded ${pressed ? 'saturate-200 bg-purple-300 border-purple-700' : 'border-purple-900 opacity-75'}`}
            style={{ boxShadow: pressed ? '#00000010 1px 1px 2px 2px inset, #ffffff10 -2px -2px 2px 2px inset' : '#00000018 1px 1px 0px 1px' }}
            onClick={onClick}
            title={title}
        >
            {children}
        </div>
    );
}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const { points, setPoints, tolerance, setTolerance, showRaw, setShowRaw, showPts, setShowPts, showCtr, setShowCtr, } = useContext(PathSimplifyContext);

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
        <div className="relative text-gray-700 select-none">
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300">
                <path fill="none" stroke="red" strokeWidth={5} d={path} />
                <path fill="none" stroke="orange" strokeWidth={3} d={path} />
                {showRaw && <RenderRawPoints pts={points} />}
                {showPts && <RenderCpts pts={controlPoints.points} />}
                {showCtr && <RenderCptsHandlesSquares cpts={controlPoints.controls} />}
            </svg>

            {/* Controls */}
            <div className="ml-2 mb-2 absolute bottom-0 flex items-center space-x-4">
                <button className="p-2 border border=gray-400 rounded shadow" onClick={() => setPoints([])}>Clear</button>
                {/* Tolerance range and Points stats */}
                <div className="pb-1 flex flex-col text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="">Tolerance:</div>
                        <input
                            className="w-32" type="range" value={tolerance} onChange={(event) => setTolerance(+withDigits(+event.target.value, 0))}
                            min={0} max={100} step={0.01}
                        />
                        <div className="w-12">{tolerance}</div>
                    </div>
                    <div className="">Points: {points.length} -&gt; {controlPoints.points.length}</div>
                </div>
                <div className="flex space-x-1">
                    <ToogleButton pressed={showRaw} onClick={() => setShowRaw(prev => !prev)} title="show raw points">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M14 7.1a8.3 8.3 0 016.3 7.8m-16.7-.1A8.3 8.3 0 0110 7.1" />
                            <path d="M14 6.9a1 1 0 010 .2 2 2 0 01-4 0 2 2 0 010-.2 2 2 0 014 0z" />
                            <circle cx="3.6" cy="16.9" r="2" />
                            <circle cx="20.4" cy="16.9" r="2" />
                        </svg>
                    </ToogleButton>
                    <ToogleButton pressed={showPts} onClick={() => setShowPts(prev => !prev)} title="show smooth points">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M13.9 7.1a8.3 8.3 0 016.4 7.8m-16.6-.1a8.3 8.3 0 016.2-7.7" />
                            <path d="M1.6 15.1h4v4h-4zm16.8 0h4v4h-4zM9.9 4.9h4v4h-4z" />
                        </svg>
                    </ToogleButton>
                    <ToogleButton pressed={showCtr} onClick={() => setShowCtr(prev => !prev)} title="show point handles">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M14 7.1a8.3 8.3 0 016.4 7.8m-16.7-.1A8.4 8.4 0 0110 7.1" />
                            <path d="M1.6 15.1h4v4h-4zm16.8 0h4v4h-4z" />
                            <path d="M118.6 93.4v4h-4v-4zm-3.9 2.2h-.1z" transform="translate(-104.6 -88.5)" />
                            <path className="cls-3" d="M20.4 7.2h-6.5m-4 0H3.6" />
                        </svg>
                    </ToogleButton>
                </div>
            </div>
        </div>
    );
};

export default PathSimplifyReact;
