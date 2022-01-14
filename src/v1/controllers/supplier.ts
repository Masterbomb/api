import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Supplier } from "../entities/supplier";
import { ResourceNotFound, HTTPError } from "../util/errors";

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

  /**
   * @openapi
   * /suppliers/{id}:
   *   get:
   *     summary: Get supplier by id
   *     tags:
   *       - Suppliers
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The supplier id
   *     responses:
   *       200:
   *         description: The supplier schema by id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Supplier'
   *       404:
   *         description: Supplier not found
   */
  async one(request: Request, _response: Response, _next: NextFunction) {
    let result:Supplier|undefined;
    try {
      result = await this.supplierRepository.findOne(request.params.id);
    } catch (err) {
      throw new HTTPError((err as Error).message);
    }
    if (!result) {
      throw new ResourceNotFound(`Could not find resource for supplier: ${request.params.id}`);
    }
    return result;
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