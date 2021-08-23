import React, { useCallback, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';
import { ControlPoint, CpType, getControlPoints, getPoints, parsePathString, pathToAbsolute, XY } from '../utils/svg-path-cpts';
import { css } from '@stitches/react';

interface PathSimplifyReactProps extends RouteComponentProps {

}

function pathCPts(pathStr: string) {
    const tuples = pathToAbsolute(parsePathString(pathStr));
    const points: {
        points: XY[],
        handles: ControlPoint[],
    } = {
        points: tuples.length > 1 ? getPoints(tuples) : [],
        handles: tuples.length > 1 ? getControlPoints(tuples) : [],
    };
    return points;
}

const cptsStyles = css({
    stroke: "maroon",
    strokeWidth: '1',
});

function RenderCpts({ cpts, ...rest }: { cpts: ControlPoint[]; } & React.SVGAttributes<SVGElement>) {
    rest = { r: "4", fill: "tomato", ...rest };
    return (<>
        {cpts.map((cpt, index) =>
            <React.Fragment key={index}>
                <circle className={cptsStyles()} cx={cpt.cp.x} cy={cpt.cp.y} {...rest} fill={cpt.t === CpType.computed ? 'none' : rest.fill}>
                    <title>Command {cpt.n}: {cpt.i}: x:{cpt.cp.x} y: {cpt.cp.y}</title>
                </circle>
                <line x1={cpt.pt.x} y1={cpt.pt.y} x2={cpt.cp.x} y2={cpt.cp.y} {...rest} strokeDasharray="2 2" />
            </React.Fragment>
        )}
    </>);
}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const { points, setPoints, tolerance, setTolerance } = useContext(PathSimplifyContext);

    const addPoint = useCallback(
        debounce((pt: [number, number]) => setPoints(prev => [...prev, pt]), 50), [],
    );

    const bind = useDrag((event) => {
        //if (event.event.type === 'pointerdown') {}

        if (event.dragging && event.buttons === 1) {
            let pt = pointer(event.event, svgRef.current);
            addPoint(pt);
        }

        if (event.event.type === 'pointerup') {
            if (points.length > 1) {
                setPoints(prev => [...prev]);
            }
        }
    });

    const path = React.useMemo(() => {
        //console.log('path calc');

        return points.length > 1 ? simplifyPath(points, { tolerance: tolerance }) : '';
    }, [points, tolerance]);
    // const path = React.useMemo(() => points.length > 1 ? simplifyPath(points) : '', [points]);

    const controlPoints = React.useMemo(() => {
        return pathCPts(path);
    }, [path]);

    return (
        <div className="relative">
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300">
                <path fill="none" stroke="red" strokeWidth={3} d={path} />
                {points.map((pt, idx) => {
                    return <circle cx={pt[0]} cy={pt[1]} r={5} key={idx} fill="none" stroke="blue" />;
                })}

                {controlPoints.points.map((pt, idx) => {
                    return <circle cx={pt.x} cy={pt.y} r={7} key={idx} fill="#f008" stroke="red" />;
                })}

                <RenderCpts cpts={controlPoints.handles} />

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
