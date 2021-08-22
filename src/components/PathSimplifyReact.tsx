import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';

interface PathSimplifyReactProps extends RouteComponentProps {

}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const [points, setPoints] = React.useState<[number, number][]>([]);

    const bind = useDrag((event) => {
        //console.log('event', event);

        if (event.event.type === 'pointerdown') {
            console.log('pointerdown', event);
        }

        if (event.dragging) {
            // console.log('pts', points);
            console.log('drag', event);
            let pt = event.xy;
            setPoints(prev => [...prev, pt]);

        }

        if (event.event.type === 'pointerup') {
            console.log('up', event);
        }
    });

    function buildPath() {
        console.log('points', points);
        console.log('points after', simplifyPath(points));

        if (points.length > 1) {
            return simplifyPath(points);
        }

        return '';
    }

    return (
        <div>
            <svg {...bind()} width={200} height={200} className="bg-purple-300">
                <path fill="none" stroke="red" d={buildPath()} />
            </svg>
        </div>
    );
};

export default PathSimplifyReact;
