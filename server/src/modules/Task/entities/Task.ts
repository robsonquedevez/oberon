import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Type task: 1 - round, 2 - quadrant

@Entity('tasks')
class Task {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('integer')
    type: number;

    @Column()
    created_user: string;

    @Column()
    enterprise: string;

    @Column()
    executing_user: string;

    @Column('integer')
    status_task: number;

    @Column("time with time zone")
    start_task: Date;

    @Column('time with time zone')
    end_task: Date;

    @Column('boolean')
    repeat: boolean;

    @Column()
    days_of_the_week: string;

    @Column('boolean')
    finished: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Task;