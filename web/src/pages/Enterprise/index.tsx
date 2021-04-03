import React from 'react';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';

import { Container, Content } from './styles';

const Enterprise: React.FC = () => {

    return(
        <Container>
            <Navbar />
            <Content>
                <div className='card'>
                    <div className="card-tabs">
                        <ul className="tabs tabs-fixed-width">
                            <li className="tab">Empresa</li>
                        </ul>
                    </div>
                    <div className="card-content lighten-4">
                        <div className='input-field'>
                            <Input
                                label='CNPJ'
                                icon='pin'
                                type='text'
                                disabled
                                />
                            <Input
                                label='Razão Social'
                                icon='domain'
                                type='text'
                                disabled
                                />
                        </div>
                        <div className='input-field'>
                            <Input
                                label='E-mail'
                                icon='email'
                                type='text'
                                />
                            <Input
                                label='Responsável'
                                icon='manage_accounts'
                                type='text'
                                />
                        </div>
                    </div>
                </div>
            </Content>
        </Container>
    );
}

export default Enterprise;