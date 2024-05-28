// Core Modules
const fs = require('fs');
const morgan = require('morgan');

//Import Express and create express app
const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route Callback functions(handlers)

// Tour handlers
const getAllTours = function (req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }

  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // create the new object
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  // push the new object to the current api array
  tours.push(newTour);

  // write to the file the new api data using the new array
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// User handlers
const getAllUsers = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

const createUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

const getUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

const updateUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

const deleteUser = function (req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet implemented!',
  });
};

///////////// Routes /////////////////////
// defining the routers
const userRouter = express.Router();
const tourRouter = express.Router();

// Tours routes
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
// Users routes
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// mounting the routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// Start server
const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
