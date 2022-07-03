import React from 'react';
import Flip from '../UI/Flip';

export function IconSteps(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".5">
            <path d="M37.5 11.7c.4 2.1-.2 3.3-2 3.6-1.9.2-2.6-1-3-3.2-.4-2.9.6-4.7 2-4.8s2.7 2.2 3 4.4zM38.4 17.7a2.3 2.3 0 01-1.6 2.6 2.2 2.2 0 01-2.4-1.9c-.2-1.2.7-1.2 1.8-1.5s2-.7 2.2.8zM41.7 8.1c-.4 2.2.2 3.4 2 3.6 1.8.3 2.6-1 3-3.1.4-3-.6-4.8-2-4.9S42 6 41.7 8.1zM40.8 14.1a2.3 2.3 0 001.5 2.6 2.2 2.2 0 002.4-1.8c.3-1.2-.6-1.3-1.7-1.5s-2-.8-2.2.7z" transform="translate(-27.6)" />
        </svg>
    );
}

export function IconBike(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".5" strokeLinecap="round">
            <path d="M6.1 6.2h3.5" />
            <path d="M7.2 6.2l4.6 7.8a.1.1 0 00.2 0l2.8-5.4a.1.1 0 000-.2l-6.3.1-3 5.6h8.2a1.3 1.3 0 01-1.6 1.5" />
            <circle cx="5.4" cy="14.1" r="3.8" />
            <circle cx="18.6" cy="14.1" r="3.8" />
            <path d="M18.6 14.1l-5-7.6h4.2a1.3 1.3 0 01-1.5 1.6" />
        </svg>
    );
}

type ColumnProps = {
    number: number;
    caption: string;
    title: string;
    alignRight?: boolean;
    children: React.ReactNode;
};

function DisplayColumn({ number, caption, title, alignRight: alignRight = false, children }: ColumnProps) {
    return (
        <div className="border-8 border-primary-600 border-opacity-50 bg-primary-400 bg-opacity-50" title={title}>
            <div className="flex flex-col">
                <div className={`text-[.7rem] md:text-sm whitespace-nowrap bg-primary-700 flex justify-between ${alignRight ? '' : 'flex-row-reverse'}`}>
                    <div className="m-4 w-8 h-8">
                        {children}
                    </div>
                    <div className={`flex items-center uppercase ${alignRight ? 'text-right p-3 md:p-5 pl-0' : ' p-3 md:p-5  pr-0'}`}>
                        {caption}
                    </div>
                </div>

                <div className={`p-2 md:p-4 text-2xl md:text-4xl flex items-center ${alignRight ? 'justify-end' : 'justify-start'}`}>
                    <Flip value={number} alignRight={alignRight} />
                </div>
            </div>
        </div>
    );
}

function Result({ pointsSrc, pointsDst }: { pointsSrc: number, pointsDst: number; }) {
    return (
        <div className="flex justify-center text-gray-300">
            <div className="w-full grid gap-x-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

                {/* Left */}
                <DisplayColumn number={pointsSrc} caption="Source points" title="Number of source points" alignRight={true}>
                    <IconSteps />
                </DisplayColumn>

                {/* Arrow */}
                <div className="pt-16 self-center text-primary-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>

                {/* Right */}
                <DisplayColumn number={pointsDst} caption="Smooth points" title="Number of smooth points">
                    <IconBike />
                </DisplayColumn>
                
            </div>
        </div>
    );
}

export default Result;
