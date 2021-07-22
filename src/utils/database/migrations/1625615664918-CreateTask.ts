import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTask1625615664918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'type',
                        type: 'integer'
                    },
                    {
                        name: 'created_user',
                        type: 'uuid'
                    },
                    {
                        name: 'enterprise',
                        type: 'varchar'
                    },
                    {
                        name: 'executing_user',
                        type: 'uuid'
                    },
                    {
                        name: 'status_task',
                        type: 'integer'
                    },
                    {
                        name: 'start_date',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: 'end_date',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: 'repeat',
                        type: 'boolean'
                    },
                    {
                        name: 'days_of_the_week',
                        type: 'varchar',
                        isNullable: true
                        
                    },
                    {
                        name: 'finished',
                        type: 'boolean'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
