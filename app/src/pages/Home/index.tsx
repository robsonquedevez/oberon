import React from 'react';
import BaseNavbar from '../../components/BaseNavbar';

import {    
    Container
} from './styles';

const Home: React.FC = () => {

    return (
        <BaseNavbar>

            <Container>
                Hello
            </Container>

        </BaseNavbar> 
    );
}

export default Home;