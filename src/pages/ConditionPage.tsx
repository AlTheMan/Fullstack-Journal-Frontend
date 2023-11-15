import React from 'react';
import NavBar from '../components/Navbar';

const ConditionPage: React.FC = () => {
    var hello = "Hello";

    return (
        <>
            <NavBar></NavBar>
            <h1>{hello}</h1>
        </>
    );
};

export default ConditionPage;