import React from 'react';

import Navbar from '../../components/Navbar';

import { Container } from './styles';

const Analytic: React.FC = () => {

    return(
        <Container>
            <Navbar />
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign:'center' }}>Analytics</h1>
            </div>
        </Container>
    );
}

export default Analytic;