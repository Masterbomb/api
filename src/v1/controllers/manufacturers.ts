import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ResourceNotFound, HTTPError } from "../util/errors";
import { Manufacturer } from "../entities/manufacturer";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

/**
 * @openapi
 * tags:
 *   name: Manufacturers
 *   description: Manufacturers endpoints
 */

/**
 * @openapi
 * components:
 *   examples:
 *     manufacturersPostExample:
 *       value:
 *         name: Texas Instruments
 */
export class ManufacturerController {

  private manufacturerRepository = getRepository(Manufacturer);

  /**
   * @openapi
   * /manufacturers:
   *   get:
   *     summary: Returns the list of all manufacturers
   *     tags:
   *       - Manufacturers
   *     responses:
   *       200:
   *         description: The list of all manufacturers
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Manufacturer'
   */
  async all(_request: Request, _response: Response, _next: NextFunction) {
    return this.manufacturerRepository.find();
  }

  /**
   * @openapi
   * /manufacturers/{id}:
   *   get:
   *     summary: Get manufacturer by id
   *     tags:
   *       - Manufacturers
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: manufacturer id
   *     responses:
   *       200:
   *         description: manufacturer schema by id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Manufacturer'
   *       404:
   *         description: manufacturer not found
   */
  async one(request: Request, _response: Response, _next: NextFunction) {
    let result:Manufacturer|undefined;
    try {
      result = await this.manufacturerRepository.findOne(request.params.id);
    } catch (err) {
      throw new HTTPError((err as Error).message);
    }
    if (!result)  throw new ResourceNotFound(`Could not find resource for manufacturer: ${request.params.id}`);
    return result;
  }

  /**
   * @openapi
   * /manufacturers:
   *   post:
   *     summary: Create new manufacturer
   *     tags:
   *       - Manufacturers
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Manufacturer'
   *           examples:
   *             manufacturersPostExample:
   *               $ref: '#/components/examples/manufacturersPostExample'
   *     responses:
   *       201:
   *         description: manufacturer created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Manufacturer'
   *       400:
   *         description: Bad request. Request may of failed validation checks.
   */
  async save(request: Request, _response: Response, _next: NextFunction) {
    return this.manufacturerRepository.save(request.body);
  }

  /**
   * @openapi
   * /manufacturers/{id}:
   *   put:
   *     summary: Update a manufacturer by id
   *     tags:
   *       - Manufacturers
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: manufacturer id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Manufacturer'
   *           examples:
   *             manufacturersPostExample:
   *               $ref: '#/components/examples/manufacturersPostExample'
   *     responses:
   *       201:
   *         description: Manufacturer updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Manufacturer'
   *       404:
   *         description: manufacturer not found
   */
  async update(request: Request, _response: Response, _next: NextFunction) {
    const result = await this.manufacturerRepository.findOne(request.params.id);
    if (!result) throw new ResourceNotFound(`Could not find resource for manufacturer: ${request.params.id}`);
    await this.manufacturerRepository.update(request.params.id, request.body as QueryDeepPartialEntity<Manufacturer>);
    return this.manufacturerRepository.findOne(request.params.id);
  }

  /**
   * @openapi
   * /manufacturers/{id}:
   *   delete:
   *     summary: Delete manufacturer by id
   *     tags:
   *       - Manufacturers
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: manufacturer id
   *     responses:
   *       204:
   *         description: manufacturer removed successfully
   *       404:
   *         description: manufacturer not found.
   */
  async remove(request: Request, _response: Response, _next: NextFunction) {
    const result = await this.manufacturerRepository.findOne(request.params.id);
    if (!result) throw new ResourceNotFound(`Could not find resource for manufacturer: ${request.params.id}`);
    await this.manufacturerRepository.remove(result);
  }
}