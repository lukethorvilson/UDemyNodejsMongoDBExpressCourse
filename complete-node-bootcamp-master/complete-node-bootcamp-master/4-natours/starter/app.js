// Core Modules
const express = require('express');
const morgan = require('morgan');
const AppError = require('./util/appError');
const globalErrorHandler = require('./controllers/errorController');
// IMPORTED ROUTERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//Import Express and create express app

const app = express();

// MIDDLEWARES

// only use logger when in development env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE MOUNTS
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server.`, 404));
});

// EXPRESS's error handling middleware
app.use(globalErrorHandler);
module.exports = app;
