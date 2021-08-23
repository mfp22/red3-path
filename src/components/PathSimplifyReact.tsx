import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';

interface PathSimplifyReactProps extends RouteComponentProps {

}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [points, setPoints] = React.useState<[number, number][]>([]);

    const bind = useDrag((event) => {
        //console.log('event', event);

        if (event.event.type === 'pointerdown') {
            console.log('pointerdown', event);
        }

        if (event.dragging) {
            // console.log('pts', points);
            console.log('drag', event);
            let pt = pointer(event.event, svgRef.current);
            setPoints(prev => [...prev, pt]);

        }

        if (event.event.type === 'pointerup') {
            console.log('up', event);
        }
    });

    function buildPath() {
        console.log('points', points);

        if (points.length > 1) {
            console.log('points after', simplifyPath(points));
            return simplifyPath(points);
        }

        return '';
    }

    return (
        <div>
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300">
                <path fill="none" stroke="red" d={buildPath()} />
                {points.map((pt, idx) => {
                    return <circle cx={pt[0]} cy={pt[1]} r={3} key={idx} fill="none" stroke="blue" />
                })}
            </svg>
        </div>
    );
};

export default PathSimplifyReact;
