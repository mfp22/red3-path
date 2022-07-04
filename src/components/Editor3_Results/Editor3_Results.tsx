import React from 'react';
import { useAtomValue } from 'jotai';
import { buildResultAtom, curveParams } from '@/store/store';
//import Result from './ResultDisplay';
import { ResultDisplayProduction } from './ResultDisplayProduction';

export function Editor3_Results() {
    const points = useAtomValue(curveParams.pointsAtom);
    const { controlPoints } = useAtomValue(buildResultAtom);
    return (
        <div className="col-span-full">
            {/* In and out points stats */}

            <ResultDisplayProduction
                pointsSrc={points.length}
                pointsDst={controlPoints.points.length}
            />

            {/* <Result pointsSrc={points.length} pointsDst={controlPoints.points.length} /> */}
        </div>
    );
}
