// Core Modules
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./util/appError');
const globalErrorHandler = require('./controllers/errorController');
// IMPORTED ROUTERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

//Import Express and create express app
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// MIDDLEWARES
// Security HTTP headers
app.use(helmet());

// only use logger when in development env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body Parser
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanatize());
// Data santization against XSS
app.use(xss());
// Prevent Parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours',
  });
});

app.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
});

// ROUTE MOUNTS
app.use('/', viewRouter)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);


app.get('/', (req, res) => {
  res.status(200).render('base', { tour: 'The Forest Hiker', user: 'Jonas' });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server.`, 404));
});

// EXPRESS's error handling middleware
app.use(globalErrorHandler);
module.exports = app;
