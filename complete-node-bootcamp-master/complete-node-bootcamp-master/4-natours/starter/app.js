const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello form the server side!', names: ['Luke'] });
});

app.post('/', () => {
    res.send('You can post to this endpoint...');
})

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
