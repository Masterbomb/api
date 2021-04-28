import { Router, Request, Response } from 'express';
import suppliersRouter from './routes/suppliers';
import manufacturersRouter from './routes/manufacturers';
import projectsRouter from './routes/projects';
import partsRouter from './routes/parts';
import bomRouter from './routes/bom';

const apiRoutes = Router();

// connect index router to subroutes route
apiRoutes.use('/v1/bom', bomRouter);
apiRoutes.use('/v1/parts', partsRouter);
apiRoutes.use('/v1/suppliers', suppliersRouter);
apiRoutes.use('/v1/manufacturers', manufacturersRouter);
apiRoutes.use('/v1/projects', projectsRouter);

// 404 catch for api routes
apiRoutes.use('/v1', (_req:Request, response:Response):Response => {
    response.status(404).json({ error: 'API endpoint not found' });
    return response;
});
export default apiRoutes;