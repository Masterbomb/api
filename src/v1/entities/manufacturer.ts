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
 *         name:
 *           type: string
 *           description: The supplier name
 *         created_at:
 *           type: date-time
 *           description: created at date
 *         updated_at:
 *           type: date-time
 *           description: last modified date
 *       example:
 *         name: Texas Instruments
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