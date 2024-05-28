const fs = require('fs');
// Data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//////////////Middleware function ////////////////
exports.checkID = (req, res, next, val) => {
  console.log(`Tour ID is ${val}`);
  if (+val > tours.length && +val < 0) {
    console.log('Invalid ID');
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }
  next();
};

/////////////// Handlers ////////////////////
exports.getAllTours = function (req, res) {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === +req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
