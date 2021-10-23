import {  Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

interface LngLat  {
    id: string;
    lng: string;
    lat: string;
}

interface IExecuteCoordinates {
    id: string;
    latitude: number;
    longitude: number;
    concluded: boolean;
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
    executing?: [
        {
            date: string;
            position: IExecuteCoordinates[]
        }
    ];

}

export default Coordinate;