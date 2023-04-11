import express from 'express';
import morgan from 'morgan';

import inventoryRouter from './routes/inventoryRouter.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/item', inventoryRouter);

// if no router handled the request its a 404 error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on server.`, 404));
});

// catch erer
app.use(globalErrorHandler);
export default app;
