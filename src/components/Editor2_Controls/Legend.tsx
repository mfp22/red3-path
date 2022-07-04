import React, { HTMLAttributes } from 'react';
import styles from '../Editor1_Canvas/Editor1_Canvas.module.scss';

function Dot({ label, className, ...rest }: { label: string; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex items-center space-x-1" {...rest}>
            <div className={`w-4 h-4 border rounded ${className}`}></div>
            <div className="">{label}</div>
        </div>
    );
}

export function Legend() {
    return (
        <div className="flex items-center space-x-2 lg:flex-col lg:items-start lg:space-x-0 lg:space-y-1">
            <div className="lg:pb-1">Legend:</div>

            <Dot label="placed points" className={styles.legendRaw}/>
            <Dot label="curve points" className={styles.legendCtrl}/>
            <Dot label="steps" className={styles.legendStep}/>
        </div>
    );
}
