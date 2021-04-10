
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';

import { Container } from './styles';

import marker from '../../assets/marker.svg';

const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [58, 58],
})

const AddMarker: React.FC = () => {
    const  [position, setPosition] = useState<any>(null);

    useMapEvents({
        click: (e) => {
            setPosition(L.latLng(e.latlng));
            console.log(e);
        }
    });

    return position === null ? null :
    <Marker
        position={position}
        icon={markerIcon}
    />
};

const Map: React.FC = () => {
    const initialCoords = L.latLng(-22.7599758, -47.7007174)  
    
    return (
        <Container>
            <MapContainer
                center={initialCoords}
                zoom={9}
                scrollWheelZoom={true}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    
                />

                {
                   <AddMarker />
                }
            </MapContainer>
        </Container>
    );
}

export default Map;