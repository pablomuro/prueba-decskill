import * as bodyParser from 'body-parser';
import type { Request, Response } from 'express';
import express from 'express';
import sanitizer from 'express-html-sanitizer';
import helmet from 'helmet';
import type { DataSource } from 'typeorm';

import { AppRoutes } from './routes';

export const app = express();

export const expressAppSetup = async (dataSource: DataSource) => {
  await dataSource.initialize();

  const router = express.Router();

  app.use(bodyParser.json());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  const sanitizeReqBody = sanitizer();
  app.use(sanitizeReqBody);

  AppRoutes.forEach((route) => {
    router[route.method](
      route.route,
      (req: Request, res: Response, next: () => void) => {
        const controller = new route.controller();
        const invokeResult: Promise<unknown> = controller[route.action](
          req,
          res,
          next
        );

        invokeResult.catch((error) =>
          res.status(error?.config?.status || 400).json(error.message)
        );
      }
    );
  });

  app.use('/api', router);

  return app;
};
