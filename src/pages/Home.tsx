import React, { useEffect } from 'react';
import HomePage from '../components/HomePage';

const Home = () => {
    useEffect(() => {
        document.title = "AniMAX"
    }, [])

    return (
        <HomePage />
    );
};

export default Home;