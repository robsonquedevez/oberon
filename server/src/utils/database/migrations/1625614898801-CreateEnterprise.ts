import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnterprise1625614898801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'enterprises',
                columns: [
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'number',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'zip_code',
                        type: 'varchar',
                        isNullable: true
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
        await queryRunner.dropTable('enterprises');
    }

}
