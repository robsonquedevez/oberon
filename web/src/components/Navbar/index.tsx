import React from 'react';

import logo from '../../assets/logoOberonMin.svg';

import { Container, Logo, Options, Item } from './styles';

const Navbar: React.FC = () => {

    return (

        <Container>
            <div>
                <Logo src={logo} alt='Logo Oberon' />
            </div>

            <Options>
                <Item className=''>
                    <a href="#" title='Notificações'>
                        <i className='material-icons'>notifications</i>
                    </a>
                </Item>
                <Item className=''>
                    <a href="#" title='Usuário'>
                        <i className='material-icons'>person_add</i>
                    </a>
                </Item>
                <Item className='selected'>
                    <a href="#" title='Dashboard'>
                        <i className='material-icons'>public</i>
                    </a>
                </Item>
                <Item className=''>
                    <a href="#" title='Rota'>
                        <i className='material-icons'>add_location_alt</i>
                    </a>
                </Item>
                <Item className=''>
                    <a href="#" title='Analise'>
                        <i className='material-icons'>stacked_bar_chart</i>
                    </a>
                </Item>
            </Options>

            <div>
            <a href="/" className='logout' title='Sair'>
                    <i className='material-icons'>logout</i>
                </a>
            </div>


        </Container>

    );
}

export default Navbar;