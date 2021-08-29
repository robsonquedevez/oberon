import React from 'react';
import BaseNavbar from '../../components/BaseNavbar';
import Map from '../../components/Map';

const Home: React.FC = () => {

    return (
        <BaseNavbar pageActive='home'>            
            <Map />
        </BaseNavbar> 
    );
}

export default Home;