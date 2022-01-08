import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Bom } from "../entities/bom";
import { BadQuery, HTTPError, ResourceNotFound } from "../util/errors";
import { RequestBody } from "swagger-jsdoc";
import { Project } from "../entities/project";
import { Part } from "../entities/part";

interface BomRequestBody extends RequestBody {
  part: number;
  quantity: number;
}

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
 *         quantity: 34
 */
export class BomController {

  private bomRepository = getRepository(Bom);
  private partRepository = getRepository(Part);
  private projectRepository = getRepository(Part);

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
    return this.bomRepository.find({relations: ["part", "project"]});
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
    // compute and store netprice
    let unitPrice: number;
    let result: Bom;
    try {
      const part = await this.partRepository.findOne((request.body as BomRequestBody).part, {select: ["unit_price"]});
      unitPrice = part? part.unit_price: 0;
    } catch (err) {
      throw new BadQuery("Error while retrieving part unit price for net price calculation");
    }
    (request.body as BomRequestBody).net_price = (request.body as BomRequestBody).quantity * unitPrice;
    // perform save query operation
    try {
      result = await (this.bomRepository.save(request.body) as Promise<Bom>);
    } catch (err) {
      throw new HTTPError((err as Error).message);
    }
    result.part = await (this.partRepository.findOne(result.part) as Promise<Part>);
    result.project = await (this.projectRepository.findOne(result.project) as Promise<Project>);
    return result;
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