import React from 'react';

import Navbar from '../../components/Navbar';
import Map from '../../components/Map';

import { Container } from './styles';

const Dashboard: React.FC = () => {

    return (
        <Container>
            <Navbar />
            <Map />
        </Container>
    );
}

export default Dashboard;