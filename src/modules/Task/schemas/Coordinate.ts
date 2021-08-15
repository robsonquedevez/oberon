import {  Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

interface LngLat  {
    lng: string;
    lat: string;
}

@Entity('coordinates')
class Coordinate {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    task: string;

    @Column()
    coordinates: LngLat[];
}

export default Coordinate;