import React from 'react';
import './App.css';
import { Link, RouteComponentProps, Router } from '@reach/router';
import VoronoiPaper from './components/VoronoiPaper';
import VoronoiReact from './components/VoronoiReact';

function App() {
    return (
        <div className="h-screen flex flex-col bg-purple-200">
            <header className="flex-none bg-gray-200 p-2">
                <div className="">
                    <ul className="space-x-2 flex items-center">
                        <li className=""><Link className="block p-2 rounded bg-gray-50 border border-gray-400 shadow" to="/">Home</Link></li>
                        <li className=""><Link className="block p-2 rounded bg-gray-50 border border-gray-400 shadow" to="b">Page B</Link></li>
                    </ul>
                </div>
            </header>
            <Router className="flex-1 bg-green-400">
                <VoronoiReact path="/" />
                <VoronoiPaper path="b" />
            </Router>
        </div>
    );
}

export default App;
