import React from 'react';
import { useLocation } from 'react-router-dom';

import logo from '../../assets/logoOberonMin.svg';

import { Container, Logo, Options, Item } from './styles';



const Navbar: React.FC = () => {

    console.log(useLocation().pathname);

    return (

        <Container>
            <div>
                <Logo src={logo} alt='Logo Oberon' />
            </div>

            <Options>
                <Item isActive={(useLocation().pathname == '/notifications') ? true : false}>
                    <a href="/notification" title='Notificações'>
                        <i className='material-icons'>notifications</i>
                    </a>
                </Item>
                <Item isActive={(useLocation().pathname == '/user') ? true : false}>
                    <a href="/user" title='Usuário'>
                        <i className='material-icons'>person_add</i>
                    </a>
                </Item>
                <Item isActive={(useLocation().pathname == '/dashboard') ? true : false}>
                    <a href="/dashboard" title='Dashboard'>
                        <i className='material-icons'>public</i>
                    </a>
                </Item>
                <Item isActive={(useLocation().pathname == '/route') ? true : false}>
                    <a href="/route" title='Rota'>
                        <i className='material-icons'>add_location_alt</i>
                    </a>
                </Item>
                <Item isActive={(useLocation().pathname == '/analytics') ? true : false}>
                    <a href="/analytic" title='Analise'>
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