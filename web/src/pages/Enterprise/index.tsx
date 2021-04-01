import React from 'react';

import Navbar from '../../components/Navbar';

import { Container } from './styles';

const Enterprise: React.FC = () => {

    return(
        <Container>
            <Navbar />
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign:'center' }}>Empresa</h1>
            </div>
        </Container>
    );
}

export default Enterprise;