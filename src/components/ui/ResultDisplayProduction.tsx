import React from 'react';
import Flip from './Flip';

function Result({ pointsSrc, pointsDst }: { pointsSrc: number, pointsDst: number; }) {
    return (
        <div className="w-full col-span-full flex justify-center text-gray-300">
        {/* <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold"> */}

            <div className="w-full grid gap-x-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                {/* <div className="col-span-full justify-self-start -mt-8 mb-4 px-4 bg-primary-700">Points:</div> */}

                {/* Left */}
                <div className="">
                    <div className="relative p-4 text-4xl rounded-md border border-primary-800 overflow-hidden">
                        <div className="1absolute -m-4 mb-4 px-4 py-1 right-0 top-0 text-sm bg-primary-800 text-right"># Source points</div>
                        <Flip value={pointsSrc} alignRight={true} />
                    </div>
                </div>

                {/* Arrow */}
                <div className="self-center">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
                {/* Right */}
                <div className="relative p-4 text-4xl rounded-md border border-primary-800 overflow-hidden">
                    <div className="1absolute -m-4 mb-4 px-4 py-1 left-0 top-0 text-sm bg-primary-800"># Smooth points</div>
                    <Flip value={pointsDst} />
                </div>
            </div>
        </div>
    );
}

export default Result;
