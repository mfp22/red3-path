import React from 'react';
import './App.css';
import { Link, RouteComponentProps, Router } from '@reach/router';

function PageA(props: RouteComponentProps) {
    return (
        <div className="bg-pink-200">A</div>
    );
}

function PageB(props: RouteComponentProps) {
    return (
        <div className="bg-pink-300">B</div>
    );
}

function App() {
    return (
        <div className="h-screen flex flex-col bg-purple-200">
            <header className="flex-none bg-gray-200 p-2">
                <div className="">
                    <ul className="space-x-2 flex items-center">
                        <li className=""><Link className="p-2 block rounded bg-gray-50 border border-gray-400 shadow" to="/">Home</Link></li>
                        <li className=""><Link className="p-2 block rounded bg-gray-50 border border-gray-400 shadow" to="b">Page B</Link></li>
                    </ul>
                </div>
            </header>
            <Router className="flex-1 bg-green-400">
                <PageA path="/" />
                <PageB path="b" />
            </Router>
        </div>
    );
}

export default App;
