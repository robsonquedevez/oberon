import {  Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

interface LngLat  {
    lng: string;
    lat: string;
}

@Entity('coordinates')
class Coordinate {

    @ObjectIdColumn()
    id: ObjectID;

    @Column('uuid')
    task_id: string;

    @Column('array')
    coordinates: Array<LngLat>;
}

export default Coordinate;