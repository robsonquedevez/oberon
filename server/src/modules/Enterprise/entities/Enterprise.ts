import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('enterprises')
class Enterprise {

    @PrimaryColumn()
    cnpj: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    number: string;

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