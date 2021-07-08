import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity('enterprises')
class Enterprise {

    @PrimaryColumn()
    cnpj: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column('numeric')
    number: number;

    @Column()
    district: string;
    
    @Column()
    city: string;
    
    @Column()
    state: string;

    @Column('numeric')
    zip_code: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;    
}

export default Enterprise;