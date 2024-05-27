// Core Modules
const fs = require('fs');

//Import Express and create express app
const express = require('express');
const { dirname } = require('path');
const exp = require('constants');
const app = express();

app.use(express.json());

// Setting Up Express and Running a basic Server Lession
{
  // app.get('/', (req, res) => {
  //   res
  //     .status(200)
  //     .json({ message: 'Hello form the server side!', names: ['Luke'] });
  // });
  // app.post('/', () => {
  //     res.send('You can post to this endpoint...');
  // })
}

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tours: tours.find(val => val.id === +req.params.id),
      },
    });
  });

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
