import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm'

const TABLE = 'appointments'

export default class AlterProviderFieldtoProviderId1592953519163
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(TABLE, 'provider')
        await queryRunner.addColumn(
            TABLE,
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        )

        await queryRunner.createForeignKey(
            TABLE,
            new TableForeignKey({
                name: 'ProviderId',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE, 'ProviderId')

        await queryRunner.dropColumn(TABLE, 'provider_id')

        await queryRunner.addColumn(
            TABLE,
            new TableColumn({
                name: 'provider',
                type: 'varchar',
            }),
        )
    }
}
