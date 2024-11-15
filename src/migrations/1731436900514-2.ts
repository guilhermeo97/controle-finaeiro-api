import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTableXXXX implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "financas",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "ocurence_date",
            type: "date",
            isNullable: true,
          },
          {
            name: "type_value",
            type: "enum",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("financas");
  }
}
