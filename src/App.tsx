import React from 'react';
import './App.css';
import { PathSimplifyProvider } from './store/PathSimplify';
import PathSimplifyReact from './components/PathSimplifyReact';
import Footer from './components/ui/Footer';

function App() {
    return (
        <>
            <PathSimplifyProvider>
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
                        <PathSimplifyReact />
                    </div>
                    <div className="hidden md:block">
                        <Footer />
                    </div>
                </div>
            </PathSimplifyProvider >
            
        </>
    );
}

export default App;
