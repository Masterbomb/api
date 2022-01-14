/* eslint-disable @typescript-eslint/naming-convention*/
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * @openapi
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the project
 *         name:
 *           type: string
 *           description: Project title
 *         description:
 *           type: string
 *           description: Project brief
 *         created_at:
 *           type: date-time
 *           description: created at date
 *         updated_at:
 *           type: date-time
 *           description: last modified date
 *       example:
 *         id: 1
 *         name: OpenHerb
 *         description: Open source herb monitoring and analytics
 */
@Entity()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({nullable: false})
	name: string;

	@Column({nullable: true})
	description: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}