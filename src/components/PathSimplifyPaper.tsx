import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import paper from 'paper';

interface PathSimplifyPaperProps extends RouteComponentProps {

}

const draw1 = () => {
    let myPath: paper.Path = new paper.Path();

    paper.view.onMouseDown = (event: paper.MouseEvent) => {
        myPath.strokeColor = new paper.Color("white");
        myPath.strokeWidth = 3;
    };

    paper.view.onMouseUp = (event: paper.MouseEvent) => {
        myPath.simplify(10);
        myPath.selected = true;
    };

    paper.view.onMouseDrag = (event: paper.MouseEvent) => {
        myPath.add(event.point);
    };
};

const PathSimplifyPaper: React.FC<PathSimplifyPaperProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        if (!canvasRef.current) { return; }
        paper.setup(canvasRef.current);
        draw1();
    }, []);
    return (
        <div>
            <canvas width={300} height={300} ref={canvasRef} className="bg-pink-300">B</canvas>
        </div>
    );
};

export default PathSimplifyPaper;
