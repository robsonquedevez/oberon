import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer } from '@monsonjeremy/react-leaflet';
import L from 'leaflet';

import { Container } from './styles';

interface IRoute {
    latitude: number;
    longitude: number;
    timestamp: number;
}

interface IMarker {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    concluded: boolean;
    datetime: number;
}

interface MapProps {
    initialPosition?: [ lat: number, lng: number ];
    zoomScroll?: boolean;
    markers?: IMarker[];
    route?: IRoute[];
}

const Map: React.FC<MapProps> = ({ 
    initialPosition = null, 
    zoomScroll=true, 
    markers,
    route,
    children 
}) => {
    const initialCoords = L.latLng(-22.7599758, -47.7007174);

    return (
        <Container>
            <MapContainer 
                center={ initialPosition ? initialPosition : initialCoords}
                zoom={ initialPosition? 25 : 9}
                scrollWheelZoom={zoomScroll}
                style={{ width: '100%', height: '100%' }}
                zoomControl={!zoomScroll}
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                children
            }
            </MapContainer>
        </Container>
    );
}

export default Map;