import React, { useState, useCallback } from 'react';
import { useMapEvents, Marker, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { v4 } from 'uuid';

import Navbar from '../../components/Navbar';
import Map from '../../components/Map';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
    Container, 
    BtnAction, 
    Search, 
    RouteLocation, 
    Quadrant,
    BtnClose 
} from './styles';


import marker from '../../assets/marker.svg';
import QuadMarker from '../../assets/quadrantMarker.svg';

const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [58, 58],
});

const quadMarkerIcon = L.icon({
    iconUrl: QuadMarker,
    iconSize: [18, 18],
});

const AddMarker: React.FC = () => {
    const  [position, setPosition] = useState<any>(null);

    useMapEvents({
        click: (e) => {
            setPosition(L.latLng(e.latlng));                     
        }
    });

    return position === null ? null :
    <Marker
        position={position}
        icon={markerIcon}
    />
};

const AddQuadrant: React.FC = () => {
    const  [positions, setPositions] = useState<any>([]);

    useMapEvents({
        click: (e) => {
            if(positions.length < 10){
                setPositions([ ...positions, e.latlng ] )
            }
        }
    });

    return (positions.length === 0) ? 
        null 
    :
        ( 
            (positions.length < 3) ?
                positions.map((element: L.LatLngLiteral) => (     
                    <Marker
                        key={v4()}
                        position={L.latLng(element)}
                        icon={quadMarkerIcon}
                    />
                ))
            :        
            <Polygon
                positions={(positions)}
                pathOptions={{
                    color: 'purple'
                }}
            />
        )
};


const Route: React.FC = () => {
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [openRoute, setOpenRoute] = useState<boolean>(false);
    const [openQuadrant, setOpenQuadrant] = useState<boolean>(false);
    const [ isFocused, setIsFocused ] = useState<boolean>(true);

    const handleOpenSearch = useCallback((value) => {
        setOpenSearch(value);
        setOpenRoute(false);
        setOpenQuadrant(false);
    }, []);

    const handleOpenRoute = useCallback((value) => {
        setOpenRoute(value);
        setOpenSearch(false);
        setOpenQuadrant(false);
    }, []);

    const handleOpenQuadrant = useCallback((value) => {
        setOpenQuadrant(value);
        setOpenRoute(false);
        setOpenSearch(false);
    }, []);


    return(
        <Container>
            <Navbar />            
            <Map>
                {
                    openQuadrant &&
                    <AddQuadrant />                    
                }
                {
                    openRoute &&
                    <AddMarker />
                }
            </Map>

            <BtnAction>
                <ul>
                    <li><a className="btn-floating yellow" title='Criar Check Points'><i className="material-icons">push_pin</i></a></li>
                    <li><a className="btn-floating red" title='Criar Quadrante'onClick={() => handleOpenQuadrant(!openQuadrant)}><i className="material-icons">highlight_alt</i></a></li>
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

            {
                openQuadrant &&

                <Quadrant className='card'>
                    <div className='card-content'>
                        <BtnClose onClick={() => setOpenQuadrant(false)}>
                            <i className='material-icons'>close</i>
                        </BtnClose>
                        <h6>Selecione no mínimo tres pontos no mapa para construir uma área delimitada.</h6>                       
                    </div>
                </Quadrant>
            }

            
        </Container>
    );
}
export default Route;