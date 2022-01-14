/* eslint-disable @typescript-eslint/naming-convention*/
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
 *           description: The auto-generated id of the supplier
 *         name:
 *           type: string
 *           description: The supplier name
 *         website:
 *           type: string
 *           description: The supplier webpage
 *         created_at:
 *           type: date-time
 *           description: created at date
 *         updated_at:
 *           type: date-time
 *           description: last modified date
 *       example:
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

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}