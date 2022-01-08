import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Project } from "../entities/project";
import { ResourceNotFound, HTTPError } from "../util/errors";

/**
 * @openapi
 * tags:
 *   name: Projects
 *   description: Projects endpoints
 */

/**
 * @openapi
 * components:
 *   examples:
 *     projectsPostExample:
 *       value:
 *         name: OpenHerb
 *         revision: v1.23
 *         description: Open source herb monitoring and analytics
 */
export class ProjectController {

  private projectRepository = getRepository(Project);

  /**
   * @openapi
   * /projects:
   *   get:
   *     summary: Returns the list of all projects
   *     tags:
   *       - Projects
   *     responses:
   *       200:
   *         description: The list of all projects
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Project'
   */
  async all(_request: Request, _response: Response, _next: NextFunction) {
    return this.projectRepository.find();
  }

  /**
   * @openapi
   * /projects/{id}:
   *   get:
   *     summary: Get project by id
   *     tags:
   *       - Projects
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: project id
   *     responses:
   *       200:
   *         description: project schema by id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Project'
   *       404:
   *         description: project not found
   */
  async one(request: Request, _response: Response, _next: NextFunction) {
    let result: Project | undefined;
    try {
      result = await this.projectRepository.findOne(request.params.id);
    } catch (err) {
      throw new HTTPError((err as Error).message);
    }
    if (!result)  throw new ResourceNotFound(`Could not find resource for project: ${request.params.id}`);
    return result;
  }

  /**
   * @openapi
   * /projects:
   *   post:
   *     summary: Create new project
   *     tags:
   *       - Projects
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Project'
   *           examples:
   *             projectsPostExample:
   *               $ref: '#/components/examples/projectsPostExample'
   *     responses:
   *       200:
   *         description: project created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Project'
   *       400:
   *         description: Bad request. Request may of failed validation checks.
   */
  async save(request: Request, _response: Response, _next: NextFunction) {
    return this.projectRepository.save(request.body);
  }

  /**
   * @openapi
   * /projects/{id}:
   *   delete:
   *     summary: Delete project by id
   *     tags:
   *       - Projects
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: project id
   *     responses:
   *       204:
   *         description: project removed successfully
   *       404:
   *         description: project not found.
   */
  async remove(request: Request, _response: Response, _next: NextFunction) {
    const result = await this.projectRepository.findOne(request.params.id);
    if (!result) throw new ResourceNotFound(`Could not find resource for project: ${request.params.id}`);
    await this.projectRepository.remove(result);
  }
}