import { atom, Getter } from "jotai";
import { Atomize, atomWithCallback } from "../hooks/atomsX";
import { debounce } from "../utils/debounce";

//#region LocalStorage

namespace Storage {
    const KEY = 'react-d3-path';

    type Store = {
        curveParams: CurveParams;
        showOptions: ShowOptions;
    };

    export let initialData: Store = {
        curveParams: {
            points: [],
            tolerance: 0,
            precision: 0,
            nStepPoints: 0,
        },
        showOptions: {
            showLine: true,
            showRaw: true,
            showPts: true,
            showCtr: true,
        },
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = { ...initialData, ...obj };
            } catch (error) {
            }
        }
    }
    load();

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: Store = {
            curveParams: {
                points: get(curveParams.pointsAtom),
                tolerance: get(curveParams.toleranceAtom),
                precision: get(curveParams.precisionAtom),
                nStepPoints: get(curveParams.nStepPointsAtom),
            },
            showOptions: {
                showLine: get(showOptions.showLineAtom),
                showRaw: get(showOptions.showRawAtom),
                showPts: get(showOptions.showPtsAtom),
                showCtr: get(showOptions.showCtrAtom),
            },
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => Storage.saveDebounced(get);
}

//#endregion LocalStorage

type Point = [x: number, y: number];

type CurveParams = {
    points: Point[];
    tolerance: number;
    precision: number;
    nStepPoints: number;
};

const curveParams: Atomize<CurveParams> = {
    pointsAtom: atomWithCallback<Point[]>(Storage.initialData.curveParams.points, Storage.save),
    toleranceAtom: atomWithCallback<number>(Storage.initialData.curveParams.tolerance, Storage.save),
    precisionAtom: atomWithCallback<number>(Storage.initialData.curveParams.precision, Storage.save),
    nStepPointsAtom: atomWithCallback<number>(Storage.initialData.curveParams.nStepPoints, Storage.save),
};

type ShowOptions = {
    showLine: boolean;
    showRaw: boolean;
    showPts: boolean;
    showCtr: boolean;
};

const showOptions: Atomize<ShowOptions> = {
    showLineAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showLine, Storage.save),
    showRawAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showRaw, Storage.save),
    showPtsAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showPts, Storage.save),
    showCtrAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showCtr, Storage.save),
};
