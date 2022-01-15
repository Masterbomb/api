/* eslint-disable @typescript-eslint/naming-convention*/
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * @openapi
 * components:
 *   schemas:
 *     Manufacturer:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the manufacturer
 *           example: 1
 *         name:
 *           type: string
 *           description: The supplier name
 *           example: Texas Instruments
 *         created_at:
 *           type: datetime
 *           description: created at date
 *           example: 2022-01-14T19:39:26.333Z
 *         updated_at:
 *           type: datetime
 *           description: last modified date
 *           example: 2022-01-14T19:39:26.333Z
 */
@Entity()
export class Manufacturer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}