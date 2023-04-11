import express from 'express';
import morgan from 'morgan';
import * as url from 'url';
import path from 'path';

import inventoryRouter from './routes/inventoryRouter.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();

// middlewares and api routes
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/item', inventoryRouter);

// views
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// if no router handled the request its a 404 error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on server.`, 404));
});

// catch erer
app.use(globalErrorHandler);
export default app;
