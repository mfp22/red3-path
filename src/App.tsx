import React from 'react';
import './App.css';
import { Section2_Main } from '@/components/Section2_Main';
import { Section3_Footer } from '@/components/Section3_Footer';

function App() {
    return (
        <div className="h-screen flex flex-col">

            {/* <header className="p-2 shadow-md">
                        <div className="">
                            <div className="space-x-2 flex items-center">
                                <div className="block p-2 rounded text-gray-100 bg-primary-700 saturate-50 border border-primary-400 shadow">Simplify points</div>
                                <div className="block p-2 rounded text-gray-100 bg-primary-700 saturate-50 border border-primary-400 shadow">Simplify path</div>
                            </div>
                        </div>
                    </header> */}

            <div className="flex-1 lg:max-w-5xl mx-auto px-4 flex items-center justify-center">
                <Section2_Main />
            </div>

            <div className="hidden sm:block">
                <Section3_Footer />
            </div>

        </div>
    );
}

export default App;
