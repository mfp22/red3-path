import React from 'react';
import { Section1_Header } from './Section1_header';
import { Editor2_Controls } from './Editor2_Controls/Editor2_Controls';
import { Editor3_Results } from './Editor3_Results/Editor3_Results';
import { Editor1_Canvas } from './Editor1_Canvas/Editor1_Canvas';

export function Section2_Main() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[420px] md:max-w-[480px] lg:max-w-full gap-4 text-gray-700 select-none">
            <Section1_Header />
            <Editor1_Canvas />
            <Editor2_Controls />
            <Editor3_Results />
        </div>
    );
}
