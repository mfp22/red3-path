import { atom } from "jotai";

type Point = [x: number, y: number];

type CurveOptions ={
    points: Point[];
    tolerance: number;
    precision: number;
    nStepPoints: number;
}

export const points = atom<Point[]>([]);
export const tolerance = atom(0);
export const precision = atom(0);
export const nStepPoints = atom(0);

type ShowOptions = {
    showLine: boolean;
    showRaw: boolean;
    showPts: boolean;
    showCtr: boolean;
};
