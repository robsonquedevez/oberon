import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer } from '@monsonjeremy/react-leaflet';
import L from 'leaflet';

import { Container } from './styles';

const Map: React.FC = ({ children }) => {
    const initialCoords = L.latLng(-22.7599758, -47.7007174);

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
            </MapContainer>
        </Container>
    );
}

export default Map;