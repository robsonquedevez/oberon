import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUser1631487132131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,                        
                    },
                    {
                        name: 'password',
                        type: 'varchar',                        
                    },
                    {
                        name: 'administrator',
                        type: 'boolean',
                        default: false
                    },
                    {
                        name: 'enterprise',
                        type: 'varchar',
                        isNullable: true,
                        default: null
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
        await queryRunner.createForeignKey('users', 
            new TableForeignKey({                          
                name: 'fk_user_enterprise',
                columnNames: ['enterprise'],
                referencedColumnNames: ['cnpj'],
                referencedTableName: 'enterprises'                
            })
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users','fk_user_enterprise');
        await queryRunner.dropTable('users');
    }

}
