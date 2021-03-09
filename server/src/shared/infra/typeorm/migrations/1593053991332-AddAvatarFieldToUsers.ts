import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

const TABLE = 'users'

export default class AddAvatarFieldToUsers1593053991332
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            TABLE,
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(TABLE, 'avatar')
    }
}
