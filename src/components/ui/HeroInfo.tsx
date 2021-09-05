import React from 'react';

function HeroInfo({className, style, ...rest}: React.HTMLAttributes<HTMLDivElement>) {

    return (
        <div 
            className={`text-primary-900 tracking-tight ${className}`}
            style={{ textShadow: '1px 1px #5a5a5a', ...style }}
            {...rest}
        >
            Draw a line on the canvas and use the tolerance slider to see the result of the interpolation.
        </div>
    );
}

export default HeroInfo;