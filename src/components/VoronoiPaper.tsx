import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import paper from 'paper';

interface VoronoiPaperProps extends RouteComponentProps {

}

const draw1 = () => {
    let myPath: paper.Path = new paper.Path();

    paper.view.onMouseDown = (event: paper.MouseEvent) => {
        myPath.strokeColor = new paper.Color("white");
        myPath.strokeWidth = 3;
    };

    paper.view.onMouseDrag = (event: paper.MouseEvent) => {
        let seg = myPath.add(event.point) as paper.Segment;
        seg.selected = true;

        if (myPath.segments.length > 20) {
            myPath.simplify();

            console.log('myPath', myPath);
        }
    };
};

const VoronoiPaper: React.FC<VoronoiPaperProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!canvasRef.current) { return; }
        paper.setup(canvasRef.current);
        draw1();
    }, []);
    return (
        <div>
            <canvas ref={canvasRef} className="bg-pink-300">B</canvas>
        </div>
    );
};

export default VoronoiPaper;
