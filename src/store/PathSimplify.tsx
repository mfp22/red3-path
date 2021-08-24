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

const initialPoints: [number, number][] = [[101,347],[97,318],[107,273],[126,230],[151,192],[175,165],[201,143],[238,123],[285,103],[331,89],[359,85],[374,88],[401,99],[413,107],[414,112],[414,121],[411,128],[403,132],[393,135],[373,137],[349,137],[327,136],[305,135],[277,133],[242,133],[215,133],[191,133],[167,131],[134,128],[100,126],[73,126],[53,129],[41,135],[39,143],[43,157],[53,169],[69,181],[89,187],[120,193],[153,196],[186,199],[222,205],[265,213],[297,224],[322,237],[341,251],[357,263],[371,275],[379,285],[385,292],[393,301],[397,307],[400,314],[405,324],[409,333],[413,343],[415,346],[416,351],[417,352],[417,355],[418,359],[419,361],[419,367],[419,374],[419,379],[419,379]];

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