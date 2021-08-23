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

const PathSimplifyProvider: React.FC = ({ children }) => {
    const [points, setPoints] = React.useState<[number, number][]>([]);
    const [tolerance, setTolerance] = React.useState<number>(12);

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