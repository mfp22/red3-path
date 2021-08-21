import React from 'react';
import './App.css';
import { RouteComponentProps, Router } from '@reach/router';

function PageA(props: RouteComponentProps) {
    return (
        <div className="">A</div>
    );
}

function PageB(props: RouteComponentProps) {
    return (
        <div className="">2222</div>
    );
}

function App() {
    return (
        <div className="">
            <header className="bg-gray-600">
                123
            </header>
            <Router>
                <PageA path="/" />
                <PageB path="b"/>
            </Router>
        </div>
    );
}

export default App;
