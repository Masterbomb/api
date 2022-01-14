import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

/**
 * @openapi
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       required:
 *         - name
 *         - website
 *       properties:
 *         id:
 *           type: number
 *           required: true
 *           description: The auto-generated id of the supplier
 *         name:
 *           type: string
 *           description: The supplier name
 *         website:
 *           type: string
 *           description: The supplier webpage
 *       example:
 *         id: 1
 *         name: Digikey
 *         website: https://www.digikey.com/
 */
@Entity()
export class Supplier extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: false})
	name: string;

	@Column({nullable: false})
	website: string;

}