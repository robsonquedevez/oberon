import {  Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

interface LngLat  {
    id: string;
    name: string;
    lng: string;
    lat: string;
}

interface IExecuteCoordinates {
    id: string;
    latitude: number;
    longitude: number;
    concluded: boolean;
}

interface IMarker {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    concluded: boolean;
    datetime: number;
}

export interface IExecuting {
    data: string;
    coordinates: IExecuteCoordinates[];
    markers: IMarker[];
}

@Entity('coordinates')
class Coordinate {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    task: string;

    @Column()
    coordinates: LngLat[];

    @Column()
    executing: IExecuting[];

}

export default Coordinate;