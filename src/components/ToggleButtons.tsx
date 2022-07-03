import React, { ReactNode } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { showOptions } from '@/store/store';

function ToogleButton({ children, toggleAtom, title }: { children: ReactNode; toggleAtom: PrimitiveAtom<boolean>; title: string; }) {
    const [pressed, setPressed] = useAtom(toggleAtom);
    return (
        <div
            className={`w-8 h-8 active:scale-[.97] border rounded ${pressed ? 'saturate-200 bg-primary-300 border-primary-700' : 'border-primary-900 opacity-75'}`}
            style={{ boxShadow: pressed ? '#00000010 1px 1px 2px 2px inset, #ffffff10 -2px -2px 2px 2px inset' : '#00000018 1px 1px 0px 1px' }}
            onClick={() => setPressed(p => !p)}
            title={title}
        >
            {children}
        </div>
    );
}

const ToggleButtons: React.FC = () => {
    return (
        <div className="flex space-x-1">
            <ToogleButton toggleAtom={showOptions.showRawAtom} title="Show raw points">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {/* <path d="M14 7.1a8.3 8.3 0 016.3 7.8m-16.7-.1A8.3 8.3 0 0110 7.1" /> */}
                    <path d="M14 6.9a1 1 0 010 .2 2 2 0 01-4 0 2 2 0 010-.2 2 2 0 014 0z" />
                    <circle cx="3.6" cy="16.9" r="2" />
                    <circle cx="20.4" cy="16.9" r="2" />
                </svg>
            </ToogleButton>
            <ToogleButton toggleAtom={showOptions.showLineAtom} title="Show curve">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3.9 17a8 8 0 01-.2-2 8.3 8.3 0 0116.6 0 8 8 0 01-.2 2"/>
                </svg>
            </ToogleButton>
            <ToogleButton toggleAtom={showOptions.showPtsAtom} title="Show smooth curve points">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13.9 7.1a8.3 8.3 0 016.4 7.8m-16.6-.1a8.3 8.3 0 016.2-7.7" />
                    <path d="M1.6 15.1h4v4h-4zm16.8 0h4v4h-4zM9.9 4.9h4v4h-4z" />
                </svg>
            </ToogleButton>
            <ToogleButton toggleAtom={showOptions.showCtrAtom} title="Show smooth curve point handles">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 7.1a8.3 8.3 0 016.4 7.8m-16.7-.1A8.4 8.4 0 0110 7.1" />
                    <path d="M1.6 15.1h4v4h-4zm16.8 0h4v4h-4z" />
                    <path d="M118.6 93.4v4h-4v-4zm-3.9 2.2h-.1z" transform="translate(-104.6 -88.5)" />
                    <path className="cls-3" d="M20.4 7.2h-6.5m-4 0H3.6" />
                </svg>
            </ToogleButton>
        </div>
    );
};

export default ToggleButtons;
