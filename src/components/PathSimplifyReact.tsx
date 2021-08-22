import React, { useEffect, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import simplifyPath from '@luncheon/simplify-svg-path';

interface PathSimplifyReactProps extends RouteComponentProps {

}

const PathSimplifyReact: React.FC<PathSimplifyReactProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) { return; }
    }, []);

    function onMouseDown(event: React.MouseEvent) {
        console.log('down');

    }

    function onMouseMove(event: React.MouseEvent) {
        console.log('drag');
    }

    function onMouseUp(event: React.MouseEvent) {
        //simplifyPath   
        console.log('up');
    }

    return (
        <div>
            <canvas
                ref={canvasRef} width={300} height={300}
                className="bg-purple-300"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >B</canvas>
        </div>
    );
};

export default PathSimplifyReact;
