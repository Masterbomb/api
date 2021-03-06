import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ResourceNotFound, HTTPError } from "../util/errors";
import { Part } from "../entities/part";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

/**
 * @openapi
 * tags:
 *   name: Parts
 *   description: Parts endpoints
 */

/**
 * @openapi
 * components:
 *   examples:
 *     partsPostExample:
 *       value:
 *         name: LM555
 *         description: SMD 555 timer IC
 *         unit_price: 3.03
 *         supplier: 1
 *         manufacturer: 1
 */
export class PartController {

  private partRepository = getRepository(Part);

  /**
   * @openapi
   * /parts:
   *   get:
   *     summary: Returns the list of all parts
   *     tags:
   *       - Parts
   *     responses:
   *       200:
   *         description: The list of all parts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Part'
   */
  async all(_request: Request, _response: Response, _next: NextFunction) {
    return this.partRepository.find({ relations: ["supplier", "manufacturer"] });
  }

  /**
   * @openapi
   * /parts/{id}:
   *   get:
   *     summary: Get part by id
   *     tags:
   *       - Parts
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: part id
   *     responses:
   *       200:
   *         description: part schema by id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Part'
   *       404:
   *         description: part not found
   */
  async one(request: Request, _response: Response, _next: NextFunction) {
    let result: Part | undefined;
    try {
      result = await this.partRepository.findOne(request.params.id, {relations: ["supplier", "manufacturer"]});
    } catch (err) {
      throw new HTTPError((err as Error).message);
    }
    if (!result)  throw new ResourceNotFound(`Could not find resource for part: ${request.params.id}`);
    return result;
  }

  /**
   * @openapi
   * /parts:
   *   post:
   *     summary: Create new part
   *     tags:
   *       - Parts
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Part'
   *           examples:
   *             partsPostExample:
   *               $ref: '#/components/examples/partsPostExample'
   *     responses:
   *       200:
   *         description: part created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Part'
   *       400:
   *         description: Bad request. Request may of failed validation checks.
   */
  async save(request: Request, response: Response, next: NextFunction) {
    let result: Part;
    try{
      result = await (this.partRepository.save(request.body) as Promise<Part>);
    } catch (err) {
      throw new HTTPError((err as Error).message);
    }
    request.params.id = result.id.toString();
    return this.one(request, response, next);
  }

  /**
   * @openapi
   * /parts/{id}:
   *   put:
   *     summary: Update a part by id
   *     tags:
   *       - Parts
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: part id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Part'
   *           examples:
   *             partsPostExample:
   *               $ref: '#/components/examples/partsPostExample'
   *     responses:
   *       201:
   *         description: part updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Part'
   *       404:
   *         description: part not found
   */
   async update(request: Request, response: Response, next: NextFunction) {
    const result = await this.partRepository.findOne(request.params.id);
    if (!result) throw new ResourceNotFound(`Could not find resource for part: ${request.params.id}`);
    await this.partRepository.update(request.params.id, request.body as QueryDeepPartialEntity<Part>);
    return this.one(request, response, next);
  }

  /**
   * @openapi
   * /parts/{id}:
   *   delete:
   *     summary: Delete part by id
   *     tags:
   *       - Parts
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: part id
   *     responses:
   *       204:
   *         description: part removed successfully
   *       404:
   *         description: part not found.
   */
  async remove(request: Request, _response: Response, _next: NextFunction) {
    const result = await this.partRepository.findOne(request.params.id);
    if (!result) throw new ResourceNotFound(`Could not find resource for part: ${request.params.id}`);
    await this.partRepository.remove(result);
  }
}