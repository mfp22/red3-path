import React from 'react';
import { useStore } from '@state-adapt/react';
import { curveParamStore } from '@/store/store';
//import Result from './ResultDisplay';
import { ResultDisplayProduction } from './ResultDisplayProduction';

export function Editor3_Results() {
  const { points, controlPoints } = useStore(curveParamStore);
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
