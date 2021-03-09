import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm'

const TABLE = 'appointments'

export default class AddUserIdToAppointments1595793153553
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            TABLE,
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true,
            }),
        )

        await queryRunner.createForeignKey(
            TABLE,
            new TableForeignKey({
                name: 'AppointmentUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE, 'ProviderId')
        await queryRunner.dropColumn(TABLE, 'user_id')
    }
}
