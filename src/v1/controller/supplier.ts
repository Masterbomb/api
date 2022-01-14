import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Supplier } from "../entities/supplier";

/**
 * @openapi
 * tags:
 *   name: Suppliers
 *   description: Suppliers endpoints
 */
export class SupplierController {

  private supplierRepository = getRepository(Supplier);

  /**
   * @swagger
   * /suppliers:
   *   get:
   *     summary: Returns the list of all suppliers
   *     tags:
   *       - Suppliers
   *     responses:
   *       200:
   *         description: The list of all suppliers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Supplier'
   */
  async all(_request: Request, _response: Response, _next: NextFunction) {
    return this.supplierRepository.find();
  }

  async one(request: Request, _response: Response, _next: NextFunction) {
    return this.supplierRepository.findOne(request.params.id);
  }

  async save(request: Request, _response: Response, _next: NextFunction) {
    return this.supplierRepository.save(request.body);
  }

  async remove(request: Request, _response: Response, _next: NextFunction) {
    const userToRemove = await this.supplierRepository.findOne(request.params.id);
    if (!userToRemove) throw new Error('User not found');
    await this.supplierRepository.remove(userToRemove);
  }
}