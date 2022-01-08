import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Bom } from "../entities/bom";
import { ResourceNotFound } from "../util/errors";

/**
 * @openapi
 * tags:
 *   name: Boms
 *   description: BOMs endpoints
 */

/**
 * @openapi
 * components:
 *   examples:
 *     bomsPostExample:
 *       value:
 *         project: 1
 *         part: 1
 *         revision: v1.2
 *         quanitity: 34
 */
export class BomController {

  private bomRepository = getRepository(Bom);

  /**
   * @openapi
   * /boms:
   *   get:
   *     summary: Returns the list of all bom relationships
   *     tags:
   *       - Boms
   *     responses:
   *       200:
   *         description: The list of all boms relationships
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Bom'
   */
  async all(_request: Request, _response: Response, _next: NextFunction) {
    return this.bomRepository.find();
  }

  /**
   * @openapi
   * /boms:
   *   post:
   *     summary: Create new bom entry
   *     tags:
   *       - Boms
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Bom'
   *           examples:
   *             bomsPostExample:
   *               $ref: '#/components/examples/bomsPostExample'
   *     responses:
   *       200:
   *         description: bom entry created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Bom'
   *       400:
   *         description: Bad request. Request may of failed validation checks.
   */
  async save(request: Request, _response: Response, _next: NextFunction) {
    return this.bomRepository.save(request.body);
  }

  /**
   * @openapi
   * /boms/{id}:
   *   delete:
   *     summary: Delete bom by id
   *     tags:
   *       - Boms
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: bom id
   *     responses:
   *       204:
   *         description: bom entry removed successfully
   *       404:
   *         description: bom not found.
   */
  async remove(request: Request, _response: Response, _next: NextFunction) {
    const result = await this.bomRepository.findOne(request.params.id);
    if (!result) throw new ResourceNotFound(`Could not find resource for bom: ${request.params.id}`);
    await this.bomRepository.remove(result);
  }
}