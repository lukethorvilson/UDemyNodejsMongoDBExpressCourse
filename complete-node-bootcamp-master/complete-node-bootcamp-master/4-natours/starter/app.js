// Core Modules
const fs = require('fs');

//Import Express and create express app
const express = require('express');
const { dirname } = require('path');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route Callback functions
const getAllTours = function (req, res) {
  res.status(200).json({
    status: 'success',
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

// Route Handlers
// Old way
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// app.route('/api/v1/tours').post(createTour);
// app.route('/api/v1/tours/:id').patch(updateTour);
// app.route('/api/v1/tours/:id').delete(deleteTour);

// Here we can chain these to handle
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
