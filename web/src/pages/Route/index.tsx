import React, { useState, useCallback } from 'react';

import Navbar from '../../components/Navbar';
import Map from '../../components/Map';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
    Container, 
    BtnAction, 
    Search, 
    RouteLocation, 
    BtnClose 
} from './styles';

const Route: React.FC = () => {
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [openRoute, setOpenRoute] = useState<boolean>(false);
    const [ isFocused, setIsFocused ] = useState<boolean>(true);

    const handleOpenSearch = useCallback((value) => {
        setOpenSearch(value);
        setOpenRoute(false);
    }, []);

    const handleOpenRoute = useCallback((value) => {
        setOpenRoute(value);
        setOpenSearch(false);
    }, []);

    return(
        <Container>
            <Navbar />            
            <Map />

            <BtnAction>
                <ul>
                    <li><a className="btn-floating yellow" title='Criar Check Points'><i className="material-icons">push_pin</i></a></li>
                    <li><a className="btn-floating red" title='Criar Quadrante'><i className="material-icons">highlight_alt</i></a></li>
                    <li><a className="btn-floating green" title='Criar Rota' onClick={() => handleOpenRoute(!openRoute)}><i className="material-icons">place</i></a></li>
                    <li><a className="btn-floating blue" title='Pesquisar Endereço' onClick={() => handleOpenSearch(!openSearch)}><i className="material-icons">search</i></a></li>
                </ul>
                <a className="btn-floating btn-large ">
                    <i className="large material-icons">menu</i>
                </a>
            </BtnAction>

            {
                openSearch && 
                <Search className='card'>
                    <div className='card-content'>
                        <BtnClose onClick={() => setOpenSearch(false)}>
                            <i className='material-icons'>close</i>
                        </BtnClose>
                        <Input
                            label='Endereço'
                            icon='travel_explore'
                            type='text'
                        />                        
                    </div>
                </Search>
            }

            {
                openRoute && 
                <RouteLocation 
                    className='card' 
                    isFocus={isFocused} 
                    onMouseOut={() => setIsFocused(false)} 
                    onMouseOver={() => setIsFocused(true)}
                >
                    <div className='card-content'>         

                        <BtnClose onClick={() => setOpenRoute(false)}>
                            <i className='material-icons'>close</i>
                        </BtnClose>

                        <Input
                            label='Destino'
                            icon='place'
                            type='text'
                        />
                        <Input
                            label='Funcionário'
                            icon='badge'
                            type='text'
                        />
                        <Input
                            label='Descrição'
                            icon='notes'
                            type='text'
                        />
                        <Button
                            label='Inserir'
                            icon='send'
                            color='blue'
                        />
                    </div>
                </RouteLocation>
            }


            
        </Container>
    );
}
export default Route;