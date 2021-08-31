import React from 'react';
import Flip from './Flip';
import { FlipCard } from './FlipCounter';

function Result({ pointsSrc, pointsDst }: { pointsSrc: [number, number][], pointsDst: XY[]; }) {
    return (
        <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold">
            <div className="w-full grid gap-x-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                <div className="col-span-full justify-self-start -mt-8 px-4 bg-primary-700">Points:</div>
                <div className="text-5xl"><Flip value={pointsSrc.length}/></div>
                {/* <div className="text-right font-mono text-2xl"><Flip value={pointsSrc.length}/></div> */}
                {/* <div className="text-right font-mono text-2xl">{pointsSrc.length}</div> */}
                <div className="self-center">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
                {/* <div className="font-mono text-2xl">{pointsDst.length}</div> */}
                {/* <div className="font-mono text-2xl"><Flip value={pointsDst.length}/></div> */}
                <div className="text-5xl"><Flip value={pointsDst.length}/></div>
            </div>
            <FlipCard children={pointsDst.length} />
        </div>
    );
}

// function Result({ pointsSrc, pointsDst }: { pointsSrc: [number, number][], pointsDst: XY[]; }) {
//     return (
//         <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold">
//             <div className="w-full grid gap-x-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
//                 <div className="col-span-full justify-self-start -mt-8 px-4 bg-primary-700">Points:</div>
//                 <div className="text-right font-mono text-2xl">{pointsSrc.length}</div>
//                 <div className="self-center">
//                     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                     </svg>
//                 </div>
//                 <div className="font-mono text-2xl">{pointsDst.length}</div>
//             </div>
//             <Flip value={pointsDst.length}/>
//         </div>
//     );
// }

// function Result({pointsSrc, pointsDst}: {pointsSrc: [number, number][], pointsDst: XY[]}) {
//     return (
//         <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold">
//             <div className="">Points: {pointsSrc.length} -&gt; {pointsDst.length}</div>
//         </div>
//     );
// }

export default Result;
