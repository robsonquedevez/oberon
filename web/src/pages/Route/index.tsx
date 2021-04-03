import React from 'react';

import Navbar from '../../components/Navbar';
import Map from '../../components/Map';

import { Container, BtnAction } from './styles';

const Route: React.FC = () => {

    return(
        <Container>
            <Navbar />            
            <Map />

            <BtnAction>
                <ul>
                    <li><a className="btn-floating yellow" title='Criar Check Points'><i className="material-icons">push_pin</i></a></li>
                    <li><a className="btn-floating red" title='Criar Quadrante'><i className="material-icons">highlight_alt</i></a></li>
                    <li><a className="btn-floating green" title='Criar Rotas' ><i className="material-icons">place</i></a></li>
                    <li><a className="btn-floating blue" title='Pesquisar Endereço'><i className="material-icons">search</i></a></li>
                </ul>
                <a className="btn-floating btn-large ">
                    <i className="large material-icons">menu</i>
                </a>
            </BtnAction>
            
        </Container>
    );
}
export default Route;