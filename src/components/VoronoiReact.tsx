import React from 'react';
import { RouteComponentProps } from '@reach/router';

interface VoronoiReactProps extends RouteComponentProps {

}

const VoronoiReact: React.FC<VoronoiReactProps> = () => {
    return (
        <div>
            <div className="bg-pink-200">A</div>
        </div>
    );
};

export default VoronoiReact;