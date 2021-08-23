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

const initialPoints: [number, number][] = [[107,311],[108,305],[113,288],[119,269],[125,249],[132,233],[140,218],[151,204],[161,194],[173,187],[181,182],[189,181],[199,188],[210,198],[219,210],[232,230],[242,245],[247,254],[259,269],[272,280],[281,283],[291,283],[311,273],[323,264],[332,253],[340,245],[347,238],[357,229],[359,227],[363,222],[367,216],[369,215]];

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