import React from 'react';

import Navbar from '../../components/Navbar';

import { Container } from './styles';

const User: React.FC = () => {

    return(
        <Container>
            <Navbar />
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign:'center' }}>Users</h1>
            </div>
        </Container>
    );
}

export default User;