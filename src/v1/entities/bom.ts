/* eslint-disable @typescript-eslint/naming-convention*/
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany
} from "typeorm";
import { Project } from "./project";
import { Part } from "./part";

/**
 * @openapi
 * components:
 *   schemas:
 *     Bom:
 *       type: object
 *       required:
 *         - project
 *         - part
 *         - quantity
 *         - revision
 *       properties:
 *         project:
 *           $ref: '#/components/schemas/Project'
 *           description: Project association
 *         part:
 *           $ref: '#/components/schemas/Part'
 *           description: Part association
 *         net_price:
 *           type: double
 *           minimum: 0
 *           example: 34.08
 *         revision:
 *           type: string
 *           description: Semantic revision string (preferrably SemVer)
 *           example: v1.1.3a
 *         created_at:
 *           type: date-time
 *           description: created at date
 *           example: 2022-01-14T19:39:26.333Z
 *         updated_at:
 *           type: date-time
 *           description: last modified date
 *           example: 2022-01-14T19:39:26.333Z
 */
@Entity()
export class Bom extends BaseEntity {

  @OneToMany(() => Project, (project) => project.id, {
    primary: true,
    onDelete: 'CASCADE',
    nullable: true
  })
  project: Project;

  @ManyToMany(() => Part, (part) => part.id, {
    primary: true,
    onDelete: 'CASCADE',
    nullable: true
  })
  part: Part;

	@Column({nullable: true})
	revision: string;

  @Column({type: "decimal", default: 0, precision:2, scale: 5, nullable: false})
  net_price: number;

  @Column({default: 1, precision: 2, scale: 5, nullable: false})
  quantity: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}