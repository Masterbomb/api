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

/**
 * @openapi
 * components:
 *   examples:
 *     suppliersPostExample:
 *       value:
 *         name: Digikey
 *         website: https://www.digikey.com/
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
   *         description: supplier id
   *     responses:
   *       200:
   *         description: supplier schema by id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Supplier'
   *       404:
   *         description: supplier not found
   */
  async one(request: Request, _response: Response, _next: NextFunction) {
    let result:Supplier|undefined;
    try {
      result = await this.supplierRepository.findOne(request.params.id);
    } catch (err) {
      throw new HTTPError((err as Error).message);
    }
    if (!result)  throw new ResourceNotFound(`Could not find resource for supplier: ${request.params.id}`);
    return result;
  }

  /**
   * @openapi
   * /suppliers:
   *   post:
   *     summary: Create new supplier
   *     tags:
   *       - Suppliers
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Supplier'
   *           examples:
   *             suppliersPostExample:
   *               $ref: '#/components/examples/suppliersPostExample'
   *     responses:
   *       200:
   *         description: supplier created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Supplier'
   *       400:
   *         description: Bad request. Request may of failed validation checks.
   */
  async save(request: Request, _response: Response, _next: NextFunction) {
    return this.supplierRepository.save(request.body);
  }

  /**
   * @openapi
   * /suppliers/{id}:
   *   delete:
   *     summary: Delete supplier by id
   *     tags:
   *       - Suppliers
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: supplier id
   *     responses:
   *       204:
   *         description: supplier removed successfully
   *       404:
   *         description: supplier not found.
   */
  async remove(request: Request, _response: Response, _next: NextFunction) {
    const result = await this.supplierRepository.findOne(request.params.id);
    if (!result) throw new ResourceNotFound(`Could not find resource for supplier: ${request.params.id}`);
    await this.supplierRepository.remove(result);
  }
}