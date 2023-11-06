import React from 'react';
import { useStore } from '@state-adapt/react';
import {
  curveParamStores,
  newNStepPoints$,
  newPrecision$,
  newTolerance$,
} from '@/store/store';
import { withDigits } from '@/utils/numbers';
import Slider from '../UI/Slider';
import { ToggleButtons } from './ToggleButtons';
import { Legend } from './Legend';

function SliderTolerance() {
  const tolerance = useStore(curveParamStores.tolerance).state;
  return (
    <div className="flex items-center space-x-2">
      <div className="min-w-[3.7rem]" title="Path tolerance">
        Tolerance
      </div>
      <div className="flex-1 h-3">
        <Slider
          min={0}
          max={400}
          step={0.1}
          value={[tolerance]}
          onValueChange={(value: number[]) =>
            newTolerance$.next(+withDigits(value[0], 0))
          }
          ariaLabel="Tolerance control"
        />
      </div>
      <div className="">{tolerance}</div>
    </div>
  );
}

function SliderStepPoints() {
  const nStepPoints = useStore(
    curveParamStores.nStepPoints,
  ).state;
  return (
    <div className="flex items-center space-x-2">
      <div
        className="min-w-[3.7rem]"
        title="Precision of numbers on a smooth path"
      >
        Steps
      </div>
      <div className="flex-1 h-3">
        <Slider
          min={0}
          max={100}
          step={1}
          value={[nStepPoints]}
          onValueChange={(value: number[]) =>
            newNStepPoints$.next(value[0])
          }
          ariaLabel="Number of step points"
        />
      </div>
      <div className="">{nStepPoints}</div>
    </div>
  );
}

function SliderPrecision() {
  // Precision of output path numbers.
  // Precision range control has effect only on the output, so we don't need it.
  const precision = useStore(curveParamStores.precision).state;
  return (
    <div className="flex items-center space-x-2">
      <div
        className="min-w-[3.7rem]"
        title="Precision of numbers on a smooth path"
      >
        Precision
      </div>
      <div className="flex-1 h-3">
        <Slider
          min={0}
          max={9}
          step={1}
          value={[precision]}
          onValueChange={(value: number[]) =>
            newPrecision$.next(+withDigits(value[0], 0))
          }
          ariaLabel="Precision control"
        />
      </div>
      <div className="">{precision}</div>
    </div>
  );
}

export function Editor2_Controls() {
  return (
    <div className="lg:min-w-[20rem] p-4 space-y-4 bg-primary-300 text-sm border-primary-600 border-8 border-opacity-50">
      <SliderTolerance />
      <SliderStepPoints />
      {/* <SliderPrecision /> */}

      <div className="flex justify-between">
        <ToggleButtons />

        <button
          className="p-1 border border-primary-700 rounded shadow active:scale-[.97]"
          onClick={() => curveParamStores.points.set([])}
          title="Clear canvas points"
        >
          Clear
        </button>
      </div>

      <Legend />
    </div>
  );
}
