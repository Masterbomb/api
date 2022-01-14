import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Supplier extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: false})
	name: string;

	@Column({nullable: false})
	website: string;

}