import React from 'react';
import './App.css';
import { PathSimplifyProvider } from './store/PathSimplify';
import PathSimplifyReact from './components/PathSimplifyReact';

function App() {
    return (
        <PathSimplifyProvider>
            <div className="h-screen flex flex-col bg-purple-200">
                <header className="flex-none bg-gray-200 p-2">
                    <div className="">
                        <div className="space-x-2 flex items-center">
                            <div className="block p-2 rounded bg-gray-50 border border-gray-400 shadow">Path simplify</div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 flex items-center justify-center">
                    <PathSimplifyReact />
                </div>
            </div>
        </PathSimplifyProvider >
    );
}

export default App;
