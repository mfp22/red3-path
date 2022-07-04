import React, { HTMLAttributes } from 'react';
import { classNames } from '@/utils/classnames';
import { COLORS } from '../Editor1_Canvas/Editor1_Canvas';

function Dot({ label, color, stroke, ...rest }: { label: string; color: string; stroke: string; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex items-center space-x-1" {...rest}>
            <div className="w-4 h-4 border rounded" style={{ backgroundColor: color, borderColor: stroke }}></div>
            <div className="">{label}</div>
        </div>
    );
}

export function Legend() {
    return (
        <div className="flex items-center space-x-2 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-1">
            <div className="lg:pb-1">Legend:</div>

            <Dot label="raw points" color={COLORS.fillRaw} stroke={COLORS.strkRaw}/>
            <Dot label="smooth points" color={COLORS.fillCpt} stroke={COLORS.strkCpt}/>
            <Dot label="raw points" color={COLORS.fillHandle} stroke={COLORS.strkHandle}/>
        </div>
    );
}
