import React from 'react';
import { RouteComponentProps } from '@reach/router';

interface VoronoiPaperProps extends RouteComponentProps {
    
}

const VoronoiPaper: React.FC<VoronoiPaperProps> = () => {
    return (
        <div>
            <div className="bg-pink-300">B</div>
        </div>
    );
};

export default VoronoiPaper;