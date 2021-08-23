import React, { useCallback, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';

interface PathSimplifyReactProps extends RouteComponentProps {

}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const { points, setPoints, tolerance, setTolerance } = useContext(PathSimplifyContext);

    const addPoint = useCallback(
        debounce((pt: [number, number]) => setPoints(prev => [...prev, pt]), 50), [],
    );

    const bind = useDrag((event) => {

        if (event.event.type === 'pointerdown') {
            //console.log('pointerdown', event);
        }

        if (event.dragging && event.buttons === 1) {
            // console.log('pts', points);
            //console.log('drag', event);
            let pt = pointer(event.event, svgRef.current);
            //setPoints(prev => [...prev, pt]);
            addPoint(pt);
        }

        if (event.event.type === 'pointerup') {
            if (points.length > 1) {
                //setPath(simplifyPath(points));
                console.log('up');
                setPoints(prev => [...prev]);
            }
        }
    });

    const path = React.useMemo(() => {
        console.log('path calc');

        return points.length > 1 ? simplifyPath(points, { tolerance: tolerance }) : '';
    }, [points, tolerance]);
    // const path = React.useMemo(() => points.length > 1 ? simplifyPath(points) : '', [points]);

    return (
        <div className="relative">
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300">
                <path fill="none" stroke="red" d={path} />
                {points.map((pt, idx) => {
                    return <circle cx={pt[0]} cy={pt[1]} r={3} key={idx} fill="none" stroke="blue" />;
                })}
            </svg>
            <div className="ml-2 mb-2 absolute bottom-0 flex items-center space-x-4">
                <button className="p-2 border border=gray-400 rounded shadow" onClick={() => setPoints([])}>Clear</button>
                <div className="flex items-center space-x-2">
                    <div className="">Tolerance:</div>
                    <input 
                        className="w-[4rem]" type="range" value={tolerance} onChange={(event) => setTolerance(+event.target.value)}
                        min={0} max={30} step={0.01}
                    />
                </div>
                <div className="">Points: {points.length}</div>
            </div>
        </div>
    );
};

export default PathSimplifyReact;
