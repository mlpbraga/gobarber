/* eslint-disable no-console */
import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/container';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';

const app = express();

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(cors());
app.use(routes);
app.use(errors);
// error handler
app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError)
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  console.error(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3004, () => {
  console.log('🚀 Server started on port 3004!');
});
