import React from 'react';
import './App.css';
import { Link, RouteComponentProps, Router } from '@reach/router';

function PageA(props: RouteComponentProps) {
    return (
        <div className="bg-yellow-500">A</div>
    );
}

function PageB(props: RouteComponentProps) {
    return (
        <div className="">B</div>
    );
}

function App() {
    return (
        <div className="bg-purple-200">
            <header className="h-64 bg-gray-200 m-4">
                <div className="">
                    <ul className="h-24 space-x-2 flex items-center">
                        <li className=""><Link className="p-2 rounded bg-gray-50 border border-gray-300 shadow" to="/">Home</Link></li>
                        <li className=""><Link className="p-2 rounded bg-gray-50 border border-gray-300 shadow" to="b">Page B</Link></li>
                    </ul>
                </div>
            </header>
            <Router>
                <PageA path="/" />
                <PageB path="b" />
            </Router>
        </div>
    );
}

export default App;
