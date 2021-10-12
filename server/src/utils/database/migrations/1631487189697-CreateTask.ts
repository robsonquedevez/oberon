import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTask1631487189697 implements MigrationInterface {

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
                        name: 'title',
                        type: 'varchar'
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
                        name: 'start_task',
                        type: 'timestamp with time zone'
                    },
                    {
                        name: 'end_task',
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

        await queryRunner.createForeignKey('tasks', 
            new TableForeignKey({                          
                name: 'fk_create_user_task',
                columnNames: ['created_user'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users'                
            })
        )

        await queryRunner.createForeignKey('tasks', 
            new TableForeignKey({                          
                name: 'fk_executing_user_task',
                columnNames: ['executing_user'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users'                
            })
        )

        await queryRunner.createForeignKey('tasks', 
            new TableForeignKey({                          
                name: 'fk_enterprise_tasks',
                columnNames: ['enterprise'],
                referencedColumnNames: ['cnpj'],
                referencedTableName: 'enterprises'                
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tasks','fk_create_user_task');
        await queryRunner.dropForeignKey('tasks','fk_executing_user_task');
        await queryRunner.dropForeignKey('tasks','fk_enterprise_tasks');
        await queryRunner.dropTable('tasks');
    }

}
