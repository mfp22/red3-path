import React, { useCallback } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { curveParams } from '@/store/store';
import { debounce } from '@/utils/debounce';
import { withDigits } from '@/utils/numbers';
import Slider from '../UI/Slider';
import { ToggleButtons } from './ToggleButtons';
import { Legend } from './Legend';

function SliderTolerance() {
  const [tolerance, setTolerance] = useAtom(
    curveParams.toleranceAtom
  );
  const setToleranceDebounced = useCallback(
    debounce((v: number) => setTolerance(v)),
    []
  );
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
            setToleranceDebounced(+withDigits(value[0], 0))
          }
          ariaLabel="Tolerance control"
        />
      </div>
      <div className="">{tolerance}</div>
    </div>
  );
}

function SliderStepPoints() {
  const [nStepPoints, setNStepPoints] = useAtom(
    curveParams.nStepPointsAtom
  );
  const setNSetPointsDebounced = useCallback(
    debounce((cnt: number) => setNStepPoints(cnt)),
    []
  );
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
            setNSetPointsDebounced(value[0])
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
  const [precision, setPrecision] = useAtom(
    curveParams.precisionAtom
  );
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
            setPrecision(+withDigits(value[0], 0))
          }
          ariaLabel="Precision control"
        />
      </div>
      <div className="">{precision}</div>
    </div>
  );
}

export function Editor2_Controls() {
  const setPoints = useSetAtom(curveParams.pointsAtom);
  return (
    <div className="lg:min-w-[20rem] p-4 space-y-4 bg-primary-300 text-sm border-primary-600 border-8 border-opacity-50">
      <SliderTolerance />
      <SliderStepPoints />
      {/* <SliderPrecision /> */}

      <div className="flex justify-between">
        <ToggleButtons />

        <button
          className="p-1 border border-primary-700 rounded shadow active:scale-[.97]"
          onClick={() => setPoints([])}
          title="Clear canvas points"
        >
          Clear
        </button>
      </div>

      <Legend />
    </div>
  );
}
