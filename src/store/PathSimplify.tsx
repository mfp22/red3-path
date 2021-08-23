import React, { createContext } from 'react';

interface PathSimplifyDatum {
    points: [number, number][];
    setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>,
    tolerance: number;
    setTolerance: React.Dispatch<React.SetStateAction<number>>,
}

const PathSimplifyContext = createContext<PathSimplifyDatum>({
    points: [],
    setPoints: () => {},
    tolerance: 0,
    setTolerance: () => {},
});

const PathSimplifyProvider: React.FC = ({ children }) => {
    const [points, setPoints] = React.useState<[number, number][]>([]);
    const [tolerance, setTolerance] = React.useState<number>(2.5);

    return (
        <PathSimplifyContext.Provider value={{
            points,
            setPoints,
            tolerance,
            setTolerance,
        }}>
            {children}
        </PathSimplifyContext.Provider>
    );
};

export { PathSimplifyContext, PathSimplifyProvider };