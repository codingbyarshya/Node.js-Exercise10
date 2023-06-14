const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const createError = require('http-errors');
dotenv.config();

let planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];

const app = express();

app.use(express.json()); 
app.use(morgan('dev')); 

app.get('/planets', (req, res) => {
  res.json(planets);
});

app.use((req, res, next) => {
  next(createError(404)); 
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
