import React from 'react';
import Flip from './Flip';
import { FlipCard } from './FlipCounter';

function Result({ pointsSrc, pointsDst }: { pointsSrc: number, pointsDst: number; }) {
    return (
        <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold">
            <div className="w-full grid gap-x-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                <div className="col-span-full justify-self-start -mt-8 px-4 bg-primary-700">Points:</div>
                <div className="text-5xl"><Flip value={pointsSrc}/></div>
                {/* <div className="text-right font-mono text-2xl"><Flip value={pointsSrc}/></div> */}
                {/* <div className="text-right font-mono text-2xl">{pointsSrc}</div> */}
                <div className="self-center">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
                {/* <div className="font-mono text-2xl">{pointsDst}</div> */}
                {/* <div className="font-mono text-2xl"><Flip value={pointsDst}/></div> */}
                <div className="text-5xl"><Flip value={pointsDst}/></div>
            </div>
            <FlipCard children={pointsDst} />
        </div>
    );
}

// function Result({ pointsSrc, pointsDst }: { pointsSrc: number, pointsDst: number; }) {
//     return (
//         <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold">
//             <div className="w-full grid gap-x-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
//                 <div className="col-span-full justify-self-start -mt-8 px-4 bg-primary-700">Points:</div>
//                 <div className="text-right font-mono text-2xl">{pointsSrc}</div>
//                 <div className="self-center">
//                     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                     </svg>
//                 </div>
//                 <div className="font-mono text-2xl">{pointsDst}</div>
//             </div>
//             <Flip value={pointsDst}/>
//         </div>
//     );
// }

// function Result({ pointsSrc, pointsDst }: { pointsSrc: number, pointsDst: number; }) {
//     return (
//         <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold">
//             <div className="">Points: {pointsSrc} -&gt; {pointsDst}</div>
//         </div>
//     );
// }

export default Result;
