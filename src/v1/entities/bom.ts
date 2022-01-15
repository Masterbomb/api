/* eslint-disable @typescript-eslint/naming-convention*/
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({type: "decimal", default: 0, precision:2, scale: 5, nullable: false})
  net_price: number;

  @OneToMany(() => Project, (project) => project, {
    primary: true,
    onDelete: 'SET NULL',
    nullable: true
  })
  project: Project;

  @OneToMany(() => Part, (part) => part, {
    primary: true,
    onDelete: 'SET NULL',
    nullable: true
  })
  part: Part;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}