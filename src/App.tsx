import React from 'react';
import './App.css';
import { PathSimplifyProvider } from './store/PathSimplify';
import PathSimplifyReact from './components/PathSimplifyReact';

function App() {
    return (
        <PathSimplifyProvider>
            <div className="h-screen flex flex-col">
                <header className="flex-none p-2 shadow-md">
                    <div className="">
                        <div className="space-x-2 flex items-center">
                            <div className="block p-2 rounded text-gray-100 bg-primary-700 saturate-50 border border-primary-400 shadow">Simplify points</div>
                            <div className="block p-2 rounded text-gray-100 bg-primary-700 saturate-50 border border-primary-400 shadow">Simplify path</div>
                        </div>
                    </div>
                </header>
                <div className="flex justify-center text-2xl text-primary-900"><p className="text-center">Draw a line on the canvas and use the tolerance slider to see the result of the interpolation.</p></div>
                <div className="flex-1 flex items-center justify-center">
                    <PathSimplifyReact />
                </div>
            </div>
        </PathSimplifyProvider >
    );
}

export default App;
