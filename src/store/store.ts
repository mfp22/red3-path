import { atom, Getter } from "jotai";
import { Atomize, atomWithCallback } from "../hooks/atomsX";
import { debounce } from "../utils/debounce";
import { ControlPoint, getControlPoints, getPoints, parsePathString, pathToAbsolute, XY } from "@/utils/svg-path-cpts";
import simplifyPath from '@luncheon/simplify-svg-path';
import { SVG } from "@svgdotjs/svg.js";

//#region LocalStorage

//const initialPoints: [number, number][] = [[64,336],[82,298],[102,257],[127,211],[148,176],[177,146],[204,128],[235,116],[266,106],[289,102],[316,102],[336,106],[341,108],[348,118],[356,134],[358,146],[355,162],[347,170],[329,174],[298,175],[258,169],[214,165],[178,164],[150,161],[123,161],[99,161],[77,162],[54,164],[45,167],[42,176],[46,194],[60,207],[86,222],[110,234],[145,242],[188,252],[229,258],[260,266],[280,273],[297,282],[322,296],[337,310],[346,320],[350,331],[351,347],[351,360],[342,372],[324,380],[298,386],[274,388],[253,384],[232,378],[217,373],[200,369],[174,362],[159,359],[151,359],[151,346],[152,326],[154,320],[157,316],[161,312],[168,308],[172,306],[174,306],[175,305],[178,303],[179,303],[182,296],[182,295]];
//const initialPoints: [number, number][] = [[248,293],[248,285],[248,271],[244,255],[236,241],[223,229],[210,226],[197,228],[184,232],[167,240],[153,250],[133,260],[115,257],[100,248],[90,236],[85,220],[81,203],[77,188],[73,173],[71,159],[71,148],[71,143],[72,139],[73,137],[73,137],[117,399],[186,429],[261,361]];
//const initialPoints: [number, number][] = [[248,293],[248,285],[248,271],[244,255],[236,241],[223,229],[210,226],[197,228],[184,232],[167,240],[153,250],[133,260],[115,257],[100,248],[90,236],[85,220],[81,203],[77,188],[73,173],[71,159],[71,148],[71,143],[72,139],[73,137],[73,137]];
//tryzub const initialPoints: [number, number][] = [[86,46],[86,46],[86,52],[86,55],[86,59],[86,60],[86,63],[86,64],[85,313],[85,314],[85,317],[85,320],[85,322],[85,323],[85,325],[85,328],[85,328],[87,329],[89,329],[90,329],[92,329],[92,329],[95,329],[98,329],[99,329],[102,329],[104,329],[106,329],[107,329],[164,320],[167,320],[170,320],[171,320],[171,321],[175,318],[175,316],[175,312],[175,307],[175,304],[175,303],[175,302],[175,301],[158,59],[160,58],[162,55],[164,53],[166,49],[167,47],[169,46],[169,45],[170,45],[170,44],[171,42],[171,40],[171,40],[180,46],[184,49],[188,53],[194,59],[197,64],[198,65],[199,66],[203,322],[206,322],[211,324],[212,325],[216,326],[218,327],[219,327],[226,323],[227,323],[221,321],[215,318],[211,317],[214,315],[218,315],[220,315],[224,315],[226,315],[228,315],[230,315],[231,315],[233,316],[238,317],[244,320],[248,322],[252,322],[265,322],[271,322],[283,318],[289,318],[293,318],[294,318],[282,57],[285,53],[289,50],[290,48],[291,47],[293,46],[295,45],[296,44],[298,42],[299,50],[299,59],[299,63],[299,65],[299,67],[299,68],[299,72],[299,73],[302,330],[203,336],[205,459],[199,460],[193,457],[180,449],[172,443],[170,441],[168,439],[175,345],[75,345],[67,46],[67,46],[70,44],[76,44],[79,44]];
//tryzub const initialPoints: [number, number][] = [[89,61],[89,66],[89,76],[89,84],[89,90],[89,100],[89,109],[87,119],[86,133],[86,147],[86,159],[86,169],[85,182],[84,194],[84,208],[84,221],[84,233],[84,241],[86,253],[86,257],[86,258],[86,259],[86,261],[89,261],[94,261],[101,261],[107,261],[114,261],[127,262],[132,262],[138,262],[147,262],[154,262],[163,263],[171,263],[182,264],[192,264],[192,265],[189,267],[186,270],[184,274],[182,278],[180,283],[179,286],[178,290],[177,296],[176,304],[176,310],[176,317],[180,329],[188,340],[194,351],[202,360],[206,364],[207,364],[208,364],[214,358],[217,355],[220,347],[223,339],[225,330],[225,322],[228,315],[228,311],[229,306],[230,299],[232,293],[232,287],[232,283],[232,280],[231,275],[229,268],[226,265],[225,264],[221,261],[216,259],[212,255],[204,245],[199,236],[196,225],[196,212],[196,197],[199,177],[203,154],[209,134],[214,120],[217,107],[218,94],[221,76],[222,66],[223,60],[224,51],[224,45],[220,54],[216,68],[213,80],[211,93],[211,106],[211,115],[211,127],[211,140],[211,154],[211,169],[209,182],[208,190],[208,200],[208,204],[209,208],[211,213],[214,221],[218,227],[220,231],[221,234],[221,238],[221,241],[221,244],[221,248],[220,251],[220,254],[220,258],[220,258],[225,259],[240,263],[248,265],[253,266],[258,267],[271,268],[277,268],[283,268],[289,266],[295,265],[300,265],[302,265],[303,264],[305,264],[306,264],[307,257],[309,252],[311,249],[312,240],[315,226],[318,211],[321,194],[323,174],[323,160],[324,144],[325,129],[325,113],[324,99],[322,87],[319,74],[318,65],[318,61],[318,56],[315,53],[313,52],[308,54],[300,58],[292,62],[282,69],[276,76],[270,86],[264,104],[261,123],[261,140],[262,153],[265,166],[270,182],[276,194],[282,207],[289,217],[292,225],[296,234],[297,238],[298,240],[298,243],[296,247],[294,249],[293,249],[291,250],[288,251],[282,251],[279,251],[277,251],[274,251],[266,251],[255,251],[245,251],[234,251],[225,251],[218,250],[213,250],[202,250],[198,250],[193,250],[184,249],[171,249],[164,251],[155,252],[145,253],[138,253],[132,253],[128,254],[122,254],[118,254],[115,253],[113,252],[108,251],[107,251],[106,250],[105,249],[104,247],[104,244],[106,237],[111,227],[114,215],[120,198],[125,178],[130,162],[135,145],[138,127],[138,112],[136,100],[130,86],[125,73],[121,67],[118,65],[111,60],[102,54],[99,53],[95,51],[90,49],[89,48]];
const initialPoints: [number, number][] = [[263, 75], [254, 78], [240, 85], [218, 97], [196, 109], [183, 119], [171, 132], [162, 143], [157, 150], [156, 153], [154, 157], [154, 164], [154, 170], [154, 171], [205, 241], [230, 261], [248, 280], [262, 307], [275, 335], [280, 352], [280, 356], [269, 367], [257, 376], [239, 386], [221, 390], [196, 388], [182, 385], [173, 379], [164, 372], [160, 369], [154, 366], [139, 361], [124, 358], [121, 357], [357, 158], [375, 158], [399, 161], [404, 163], [407, 165], [409, 174], [409, 179], [411, 190], [411, 206], [411, 219], [409, 236], [406, 250], [404, 261], [402, 272], [400, 280], [399, 293], [396, 303], [396, 315], [396, 329], [399, 344], [402, 354], [406, 363], [410, 370], [414, 377], [415, 380], [418, 384], [421, 390], [425, 396], [425, 398], [425, 402], [424, 405], [424, 406], [421, 408], [411, 411], [403, 415], [393, 416], [373, 420], [351, 424], [329, 428], [311, 430], [294, 432], [273, 432], [251, 432], [229, 433], [202, 434], [182, 434], [159, 435], [141, 435], [131, 435], [121, 432], [111, 427], [96, 415], [86, 401], [79, 376], [71, 347], [62, 321], [59, 289], [59, 255], [61, 227], [62, 206], [64, 186], [67, 163], [70, 140], [74, 121], [76, 109], [78, 96], [79, 83], [78, 74], [76, 67], [75, 64], [75, 62]];
// const initialPoints: [number, number][] = [];

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

export type Point = [x: number, y: number];

type CurveParams = {
    points: Point[];
    tolerance: number;
    precision: number;
    nStepPoints: number;
};

export const curveParams: Atomize<CurveParams> = {
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

export const showOptions: Atomize<ShowOptions> = {
    showLineAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showLine, Storage.save),
    showRawAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showRaw, Storage.save),
    showPtsAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showPts, Storage.save),
    showCtrAtom: atomWithCallback<boolean>(Storage.initialData.showOptions.showCtr, Storage.save),
};

// Derived

export const svgWidth = 500;
export const svgHeight = 500;

export type BuildResult = {
    path: string;
    controlPoints: {
        points: XY[];
        controls: ControlPoint[];
    };
    stepPoints: Point[];
};

namespace Calc {
    export function getPath(points: [number, number][], tolerance: number, precision: number) {
        //console.log(`points\n${JSON.stringify(points.map(pt => [+withDigits(pt[0], 0), +withDigits(pt[1], 0)]))}`);
    
        return points.length > 1 ? simplifyPath(points, { tolerance, precision }) : '';
    }
    
    export function getPathPoints(pathStr: string) {
        const tuples = pathToAbsolute(parsePathString(pathStr));
        return {
            points: tuples.length > 1 ? getPoints(tuples) : [],
            controls: tuples.length > 1 ? getControlPoints(tuples) : [],
        };
    }
    
    export function svgCalcStepPoints(pathStr: string, points: number, svgWidth: number, svgHeight: number): [number, number][] { //TODO: N points or % ?
        if (points <= 0) {
            return [];
        }
    
        const draw = SVG().size(svgWidth, svgHeight);
        const path = draw.path(pathStr);
    
        const pathLength = path.length();
        if (!pathLength) {
            return [];
        }
        const step = pathLength / points;
    
        const res: [number, number][] = [];
        for (let i = 0; i <= pathLength; i = i + step) {
            let pt = path.pointAt(i);
            res.push([pt.x, pt.y]);
        }
        return res;
    }
} //namespace Calc

export const buildResultAtom = atom<BuildResult>(
    (get) => {
        const points = get(curveParams.pointsAtom);
        const tolerance = get(curveParams.toleranceAtom);
        const precision = get(curveParams.precisionAtom);
        const nStepPoints = get(curveParams.nStepPointsAtom);

        const path = Calc.getPath(points, tolerance, precision);
        const controlPoints = Calc.getPathPoints(path);
        const stepPoints = Calc.svgCalcStepPoints(path, nStepPoints, svgWidth, svgHeight);
        return {
            path,
            controlPoints,
            stepPoints,
        };
    }
);
