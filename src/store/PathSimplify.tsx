import React, { createContext } from 'react';

interface PathSimplifyDatum {
    points: [number, number][];
    //setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>,
}

const PathSimplifyContext = createContext<PathSimplifyDatum>({
    points: [],
    //setPoints: () => { },
});

const PathSimplifyProvider: React.FC = ({ children }) => {
    const [points, setPoints] = React.useState<[number, number][]>([]);

    return (
        <PathSimplifyContext.Provider value={{
            points,
            setPoints,
        }}>
            {children}
        </PathSimplifyContext.Provider>
    );
};

export { PathSimplifyContext, PathSimplifyProvider };