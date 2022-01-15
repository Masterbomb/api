/* eslint-disable @typescript-eslint/naming-convention*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Manufacturer } from "./manufacturer";
import { Supplier } from "./supplier";

/**
 * @openapi
 * components:
 *   schemas:
 *     Part:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - unit_price
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the part
 *           example: 1
 *         name:
 *           type: string
 *           description: Part name
 *           example: LM555
 *         description:
 *           type: string
 *           description: Part brief
 *           example: SMD 555 timer IC
 *         unit_price:
 *           type: double
 *           minimum: 0
 *           example: 3.03
 *         supplier:
 *           $ref: '#/components/schemas/Supplier'
 *           description: Part supplier
 *         manufacturer:
 *           $ref: '#/components/schemas/Manufacturer'
 *           description: Part manufacturer
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
export class Part extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({type: "decimal", default: 0, precision: 5, scale: 2, nullable: false})
  unit_price: number;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.id, {
    onDelete: 'SET NULL',
    nullable: true
  })
  manufacturer: Manufacturer;

  @ManyToOne(() => Supplier, (supplier) => supplier.id, {
    onDelete: 'SET NULL',
    nullable: true
  })
  supplier: Supplier;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}