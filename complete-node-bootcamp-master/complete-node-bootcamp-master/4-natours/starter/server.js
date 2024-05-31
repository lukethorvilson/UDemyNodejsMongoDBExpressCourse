const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! ⛔ Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// Database Initialization
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
); //replacing password placeholder with the config.env database password

// Creating the connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error(`${err.message}💥`);
  });

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// We can handle unhandledRejections like this
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! ⛔ Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
