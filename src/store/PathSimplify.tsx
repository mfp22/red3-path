import React, { createContext } from 'react';

interface PathSimplifyDatum {
    points: [number, number][];
    setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>,
    tolerance: number;
    setTolerance: React.Dispatch<React.SetStateAction<number>>,

    showRaw: boolean;
    setShowRaw: React.Dispatch<React.SetStateAction<boolean>>,
    showPts: boolean;
    setShowPts: React.Dispatch<React.SetStateAction<boolean>>,
    showCtr: boolean;
    setShowCtr: React.Dispatch<React.SetStateAction<boolean>>,
}

const PathSimplifyContext = createContext<PathSimplifyDatum>({
    points: [],
    setPoints: () => {},
    tolerance: 0,
    setTolerance: () => {},
    showRaw: true,
    setShowRaw: () => {},
    showPts: true,
    setShowPts: () => {},
    showCtr: true,
    setShowCtr: () => {},
});

const initialPoints: [number, number][] = [[64,336],[82,298],[102,257],[127,211],[148,176],[177,146],[204,128],[235,116],[266,106],[289,102],[316,102],[336,106],[341,108],[348,118],[356,134],[358,146],[355,162],[347,170],[329,174],[298,175],[258,169],[214,165],[178,164],[150,161],[123,161],[99,161],[77,162],[54,164],[45,167],[42,176],[46,194],[60,207],[86,222],[110,234],[145,242],[188,252],[229,258],[260,266],[280,273],[297,282],[322,296],[337,310],[346,320],[350,331],[351,347],[351,360],[342,372],[324,380],[298,386],[274,388],[253,384],[232,378],[217,373],[200,369],[174,362],[159,359],[151,359],[151,346],[152,326],[154,320],[157,316],[161,312],[168,308],[172,306],[174,306],[175,305],[178,303],[179,303],[182,296],[182,295]];

const PathSimplifyProvider: React.FC = ({ children }) => {
    const [points, setPoints] = React.useState<[number, number][]>(initialPoints);
    const [tolerance, setTolerance] = React.useState<number>(62);

    const [showRaw, setShowRaw] = React.useState<boolean>(true);
    const [showPts, setShowPts] = React.useState<boolean>(true);
    const [showCtr, setShowCtr] = React.useState<boolean>(true);

    return (
        <PathSimplifyContext.Provider value={{
            points,
            setPoints,
            tolerance,
            setTolerance,

            showRaw, setShowRaw,
            showPts, setShowPts,
            showCtr, setShowCtr,
                }}>
            {children}
        </PathSimplifyContext.Provider>
    );
};

export { PathSimplifyContext, PathSimplifyProvider };