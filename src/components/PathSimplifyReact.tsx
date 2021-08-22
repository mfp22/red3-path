import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';

interface PathSimplifyReactProps extends RouteComponentProps {

}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const [points, setPoints] = React.useState<[number, number][]>([]);

    const bind = useDrag((event) => {
        
        if (event.dragging) {
            // console.log('pts', points);
            console.log('down', event);
            let pt = event.xy;
            setPoints(prev => [...prev, pt]);

        }
        else if (event.event.type === 'pointerup') {
            console.log('up', event);
        }
    });

    function buildPath() {
        return '';
    }

    return (
        <div>
            <svg {...bind()} width={200} height={200} className="bg-purple-300">
                <path d={buildPath()} />
            </svg>
        </div>
    );
};

export default PathSimplifyReact;
