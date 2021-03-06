const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const citiesRouter = require('./api/cities');
const weatherRouter = require('./api/weather');

const ENV = process.env.NODE_ENV; //Provides information during the development phase
const PORT = process.env.PORT || 5000;

var db = require('./database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/cities',citiesRouter);
app.use('/api/weather',weatherRouter);

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}!`);
});

db.query('SELECT NOW()', (err, res) => {
    if (err.error)
      return console.log(err.error);
    console.log(`PostgreSQL connected: ${res[0].now}.`);
  });

module.exports = app;