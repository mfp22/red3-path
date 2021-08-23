import React, { useCallback, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';
import { ControlPoint, CpType, getControlPoints, getPoints, parsePathString, pathToAbsolute, XY } from '../utils/svg-path-cpts';
import { withDigits } from '../utils/numbers';

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
            return <circle cx={pt[0]} cy={pt[1]} r={3} key={idx} >
                <title>{idx}: x:{pt[0]} y: {pt[1]}</title>
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

function RenderPoints({ pts, ...rest }: { pts: XY[]; } & React.SVGAttributes<SVGElement>) {
    rest = { r: "7", stroke: "red", fill: "orange", ...rest };
    return (<g>
        {pts.map((xy, index) => <React.Fragment key={index}>
            <circle cx={xy.x} cy={xy.y} {...rest}>
                <title>{index}: x:{xy.x} y: {xy.y}</title>
            </circle>
            <text x={xy.x + 7} y={xy.y} fontSize="7" stroke="none" >{index}</text>
        </React.Fragment>)}
    </g>);
}

function RenderCptsSquares({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
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

function RenderCptsCyrcles({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
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

interface PathSimplifyReactProps extends RouteComponentProps {
}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const { points, setPoints, tolerance, setTolerance } = useContext(PathSimplifyContext);

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

    const path = React.useMemo(() => points.length > 1 ? simplifyPath(points, { tolerance: tolerance }) : '', [points, tolerance]);
    const controlPoints = React.useMemo(() => getPathPoints(path), [path]);

    return (
        <div className="relative">
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300">
                <path fill="none" stroke="orange" strokeWidth={3} d={path} />
                <RenderRawPoints pts={points} />
                <RenderPoints pts={controlPoints.points} />
                <RenderCptsSquares cpts={controlPoints.controls} />
            </svg>
            <div className="ml-2 mb-2 absolute bottom-0 flex items-center space-x-4">
                <button className="p-2 border border=gray-400 rounded shadow" onClick={() => setPoints([])}>Clear</button>
                <div className="pb-1 flex flex-col text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="">Tolerance:</div>
                        <input
                            className="w-32" type="range" value={tolerance} onChange={(event) => setTolerance(+event.target.value)}
                            min={0} max={100} step={0.01}
                        />
                        <div className="w-12">{tolerance}</div>
                    </div>
                    <div className="">Points: {points.length} -&gt; {controlPoints.points.length}</div>
                </div>
            </div>
        </div>
    );
};

export default PathSimplifyReact;
