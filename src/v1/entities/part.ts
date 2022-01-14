/* eslint-disable @typescript-eslint/naming-convention*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
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
 *         name:
 *           type: string
 *           description: Part name
 *         description:
 *           type: string
 *           description: Part brief
 *         unit_price:
 *           type: double
 *           minimum: 0
 *         supplier:
 *           $ref: '#/components/schemas/Supplier'
 *           description: Part supplier
 *         manufacturer:
 *           $ref: '#/components/schemas/Manufacturer'
 *           description: Part manufacturer
 *         created_at:
 *           type: date-time
 *           description: created at date
 *         updated_at:
 *           type: date-time
 *           description: last modified date
 *       example:
 *         id: 1
 *         name: LM555CM
 *         description: 555 timer IC
 *         unit_price: $3.03
 */
@Entity()
export class Part extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({type: "decimal", default: 0, precision:2, scale: 5, nullable: false})
  unit_price: number;

  @OneToMany(() => Manufacturer, (manufacturer) => manufacturer, {
    onDelete: 'SET NULL',
    nullable: true
  })
  manufacturer: Manufacturer;

  @OneToMany(() => Supplier, (supplier) => supplier, {
    onDelete: 'SET NULL',
    nullable: true
  })
  supplier: Supplier;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}