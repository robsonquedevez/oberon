import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnterprise1625614898801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'enterprises',
                columns: [
                    {
                        name: 'cnpj',
                        type: 'numeric',
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
                        type: 'varchar'
                    },
                    {
                        name: 'number',
                        type: 'integer'
                    },
                    {
                        name: 'district',
                        type: 'varchar'
                    },
                    {
                        name: 'city',
                        type: 'varchar'
                    },
                    {
                        name: 'state',
                        type: 'varchar'
                    },
                    {
                        name: 'zip_code',
                        type: 'integer'
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
