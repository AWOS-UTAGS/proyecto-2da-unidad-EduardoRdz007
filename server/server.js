require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express(),
const cors = require('cors');

// Habilita CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/', function (req, res) {
  res.send('<h1> Bienvenido a mi servidor Rest </h1>');
});

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));
app.use(require('./routes/login'));
app.use(require('./routes/producto'));

 mongoose.connect('mongodb+srv://admin:ArribaSinaloa10@cluster0.5wxbv.mongodb.net/cafetero', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
 }, (err, res) => {
    if(err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
  console.log('El servidor esta en linea por el puerto', process.env.PORT);
});
