import React, { useCallback, useContext } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';
import { useDrag } from 'react-use-gesture';
import { pointer } from '../utils/pointer';
import { PathSimplifyContext } from '../store/PathSimplify';
import debounce from '../utils/debounce';

interface PathSimplifyReactProps extends RouteComponentProps {

}

function convertToAbsolute(path: SVGPathElement) {
    var x0, y0, x1, y1, x2, y2, segs = path.pathSegList;
    for (var x = 0, y = 0, i = 0, len = segs.numberOfItems; i < len; ++i) {
        var seg = segs.getItem(i), c = seg.pathSegTypeAsLetter;
        if (/[MLHVCSQTA]/.test(c)) {
            if ('x' in seg) x = seg.x;
            if ('y' in seg) y = seg.y;
        } else {
            if ('x1' in seg) x1 = x + seg.x1;
            if ('x2' in seg) x2 = x + seg.x2;
            if ('y1' in seg) y1 = y + seg.y1;
            if ('y2' in seg) y2 = y + seg.y2;
            if ('x' in seg) x += seg.x;
            if ('y' in seg) y += seg.y;
            switch (c) {
                case 'm': segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i); break;
                case 'l': segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i); break;
                case 'h': segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i); break;
                case 'v': segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i); break;
                case 'c': segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i); break;
                case 's': segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i); break;
                case 'q': segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i); break;
                case 't': segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i); break;
                case 'a': segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i); break;
                case 'z': case 'Z': x = x0; y = y0; break;
            }
        }
        // Record the start of a subpath
        if (c == 'M' || c == 'm') x0 = x, y0 = y;
    }
}

function pathControlPoints(str: string) {
    var commands = str.split(/(?=[LMC])/);

    var pointArrays = commands.map(function (d) {
        var pointsArray = d.slice(1, d.length).split(',');
        var pairsArray: [number, number][] = [];
        for (var i = 0; i < pointsArray.length; i += 2) {
            pairsArray.push([+pointsArray[i], +pointsArray[i + 1]]);
        }
        return pairsArray;
    });

    return pointArrays;
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
        console.log('path calc');

        return points.length > 1 ? simplifyPath(points, { tolerance: tolerance }) : '';
    }, [points, tolerance]);
    // const path = React.useMemo(() => points.length > 1 ? simplifyPath(points) : '', [points]);

    const controlPoints = React.useMemo(() => {
        return points.length > 1 ? pathControlPoints(path) : [];
    }, [path]);

    return (
        <div className="relative">
            <svg ref={svgRef} {...bind()} width={500} height={500} className="bg-purple-300">
                <path fill="none" stroke="red" d={path} />
                {points.map((pt, idx) => {
                    return <circle cx={pt[0]} cy={pt[1]} r={3} key={idx} fill="none" stroke="blue" />;
                })}

                {controlPoints.map((pts, idx) => {
                    return pts.map(pt => <circle cx={pt[0]} cy={pt[1]} r={5} key={idx} fill="none" stroke="red" />);
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
                <div className="text-[.6rem]">{path}</div>
            </div>
        </div>
    );
};

export default PathSimplifyReact;
