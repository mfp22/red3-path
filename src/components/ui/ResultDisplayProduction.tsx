import React from 'react';
import Flip from './Flip';


export function IconSteps(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="4" {...props}>
            <path d="M200 246.84c8.81 58.62-7.33 90.67-52.91 97.41c-50.65 7.49-71.52-26.44-80.33-85.06c-11.85-78.88 16-127.94 55.71-131.1c36.14-2.87 68.71 60.14 77.53 118.75z" />
            <path d="M223.65 409.53c3.13 33.28-14.86 64.34-42 69.66c-27.4 5.36-58.71-16.37-65.09-49.19s17.75-34.56 47.32-40.21s55.99-20.4 59.77 19.74z" />
            <path d="M312 150.83c-8.81 58.62 7.33 90.67 52.9 97.41c50.66 7.49 71.52-26.44 80.33-85.06c11.86-78.89-16-128.22-55.7-131.1c-36.4-2.64-68.71 60.13-77.53 118.75z" />
            <path d="M288.35 313.53c-3.13 33.27 14.86 64.34 42 69.66c27.4 5.36 58.71-16.37 65.09-49.19s-17.75-34.56-47.32-40.22s-55.99-20.4-59.77 19.75z" />
        </svg>
    );
}

export function IconBike(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".25" stroke-linecap="round">
            <path d="M6.1 6.2h3.5" />
            <path d="M7.2 6.2l4.6 7.8a.1.1 0 00.2 0l2.8-5.4a.1.1 0 000-.2l-6.3.1-3 5.6h8.2a1.3 1.3 0 01-1.6 1.5"/>
            <circle cx="5.4" cy="14.1" r="3.8" />
            <circle cx="18.6" cy="14.1" r="3.8" />
            <path d="M18.6 14.1l-5-7.6h4.2a1.3 1.3 0 01-1.5 1.6" />
        </svg>
    );
}

function Result({ pointsSrc, pointsDst }: { pointsSrc: number, pointsDst: number; }) {
    return (
        <div className="w-full col-span-full flex justify-center text-gray-300">
            {/* <div className="w-full col-span-full p-4 flex justify-center border rounded border-white text-gray-300 text-xl font-semibold"> */}

            <div className="w-full grid gap-x-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                {/* <div className="col-span-full justify-self-start -mt-8 mb-4 px-4 bg-primary-700">Points:</div> */}

                {/* Left */}
                <div className="bg-[red] rounded-md">
                    <div className="text-4xl grid">
                        <IconSteps />
                        <div className="rounded-t-md text-sm bg-primary-800 text-right"># Source points</div>
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
                <div className="relative p-4 text-4xl rounded-md border border-primary-800 overflow-hidden shadow-md"
                    style={{ backgroundColor: 'red' }}
                >
                    <IconBike />
                    <div className="1absolute -m-4 mb-4 px-4 py-1 left-0 top-0 text-sm bg-primary-800"># Smooth points</div>
                    <Flip value={pointsDst} />
                </div>
            </div>
        </div>
    );
}

export default Result;
