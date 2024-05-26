// Core Modules
const fs = require('fs');

//Import Express and create express app
const express = require('express');
const { dirname } = require('path');
const app = express();

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

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
