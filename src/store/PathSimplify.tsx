import React, { createContext } from 'react';

interface PathSimplifyDatum {
    points: [number, number][];
    setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>,
    tolerance: number;
    setTolerance: React.Dispatch<React.SetStateAction<number>>,
    precision: number;
    setPrecision: React.Dispatch<React.SetStateAction<number>>,

    showLine: boolean;
    setShowLine: React.Dispatch<React.SetStateAction<boolean>>,
    showRaw: boolean;
    setShowRaw: React.Dispatch<React.SetStateAction<boolean>>,
    showPts: boolean;
    setShowPts: React.Dispatch<React.SetStateAction<boolean>>,
    showCtr: boolean;
    setShowCtr: React.Dispatch<React.SetStateAction<boolean>>,
}

const PathSimplifyContext = createContext<PathSimplifyDatum>({
    points: [],
    setPoints: () => { },
    tolerance: 0,
    setTolerance: () => { },
    precision: 0,
    setPrecision: () => { },

    showLine: true,
    setShowLine: () => { },
    showRaw: true,
    setShowRaw: () => { },
    showPts: true,
    setShowPts: () => { },
    showCtr: true,
    setShowCtr: () => { },
});

//const initialPoints: [number, number][] = [[64,336],[82,298],[102,257],[127,211],[148,176],[177,146],[204,128],[235,116],[266,106],[289,102],[316,102],[336,106],[341,108],[348,118],[356,134],[358,146],[355,162],[347,170],[329,174],[298,175],[258,169],[214,165],[178,164],[150,161],[123,161],[99,161],[77,162],[54,164],[45,167],[42,176],[46,194],[60,207],[86,222],[110,234],[145,242],[188,252],[229,258],[260,266],[280,273],[297,282],[322,296],[337,310],[346,320],[350,331],[351,347],[351,360],[342,372],[324,380],[298,386],[274,388],[253,384],[232,378],[217,373],[200,369],[174,362],[159,359],[151,359],[151,346],[152,326],[154,320],[157,316],[161,312],[168,308],[172,306],[174,306],[175,305],[178,303],[179,303],[182,296],[182,295]];
//const initialPoints: [number, number][] = [[248,293],[248,285],[248,271],[244,255],[236,241],[223,229],[210,226],[197,228],[184,232],[167,240],[153,250],[133,260],[115,257],[100,248],[90,236],[85,220],[81,203],[77,188],[73,173],[71,159],[71,148],[71,143],[72,139],[73,137],[73,137],[117,399],[186,429],[261,361]];
//const initialPoints: [number, number][] = [[248,293],[248,285],[248,271],[244,255],[236,241],[223,229],[210,226],[197,228],[184,232],[167,240],[153,250],[133,260],[115,257],[100,248],[90,236],[85,220],[81,203],[77,188],[73,173],[71,159],[71,148],[71,143],[72,139],[73,137],[73,137]];
//tryzub const initialPoints: [number, number][] = [[86,46],[86,46],[86,52],[86,55],[86,59],[86,60],[86,63],[86,64],[85,313],[85,314],[85,317],[85,320],[85,322],[85,323],[85,325],[85,328],[85,328],[87,329],[89,329],[90,329],[92,329],[92,329],[95,329],[98,329],[99,329],[102,329],[104,329],[106,329],[107,329],[164,320],[167,320],[170,320],[171,320],[171,321],[175,318],[175,316],[175,312],[175,307],[175,304],[175,303],[175,302],[175,301],[158,59],[160,58],[162,55],[164,53],[166,49],[167,47],[169,46],[169,45],[170,45],[170,44],[171,42],[171,40],[171,40],[180,46],[184,49],[188,53],[194,59],[197,64],[198,65],[199,66],[203,322],[206,322],[211,324],[212,325],[216,326],[218,327],[219,327],[226,323],[227,323],[221,321],[215,318],[211,317],[214,315],[218,315],[220,315],[224,315],[226,315],[228,315],[230,315],[231,315],[233,316],[238,317],[244,320],[248,322],[252,322],[265,322],[271,322],[283,318],[289,318],[293,318],[294,318],[282,57],[285,53],[289,50],[290,48],[291,47],[293,46],[295,45],[296,44],[298,42],[299,50],[299,59],[299,63],[299,65],[299,67],[299,68],[299,72],[299,73],[302,330],[203,336],[205,459],[199,460],[193,457],[180,449],[172,443],[170,441],[168,439],[175,345],[75,345],[67,46],[67,46],[70,44],[76,44],[79,44]];
const initialPoints: [number, number][] = [[248, 293], [248, 285], [248, 271], [244, 255], [236, 241], [223, 229], [210, 226], [197, 228], [184, 232], [167, 240], [153, 250], [133, 260], [115, 257], [100, 248], [90, 236], [85, 220], [81, 203], [77, 188], [73, 173], [71, 159], [71, 148], [71, 143], [72, 139], [73, 137], [73, 137], [143, 68], [141, 77], [164, 144], [171, 151], [267, 63], [274, 68], [274, 191], [274, 193], [274, 196]];
// const initialPoints: [number, number][] = [];

const PathSimplifyProvider: React.FC = ({ children }) => {
    const [points, setPoints] = React.useState<[number, number][]>(initialPoints);
    const [tolerance, setTolerance] = React.useState<number>(62);
    const [precision, setPrecision] = React.useState<number>(5);

    const [showLine, setShowLine] = React.useState<boolean>(true);
    const [showRaw, setShowRaw] = React.useState<boolean>(true);
    const [showPts, setShowPts] = React.useState<boolean>(true);
    const [showCtr, setShowCtr] = React.useState<boolean>(true);

    return (
        <PathSimplifyContext.Provider value={{
            points,
            setPoints,
            tolerance,
            setTolerance,
            precision,
            setPrecision,

            showLine, setShowLine,
            showRaw, setShowRaw,
            showPts, setShowPts,
            showCtr, setShowCtr,
        }}>
            {children}
        </PathSimplifyContext.Provider>
    );
};

export { PathSimplifyContext, PathSimplifyProvider };
