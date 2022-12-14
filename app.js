var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var database = require("./config/database")  //Variable para llamar la conexión a la base de datos
var usuariosRouter = require("./routes/usuario.router"); // Se ubica primero para luego validar el autenticador

//Autenticación de usuario
var auth = require("./auth/main_auth") 
//Dependencia para conectar API
var cors = require('cors')

var empleadosRouter = require('./routes/empleados.router'); // Llmamos a empleados router
var noviosRouter = require('./routes/novios.router');


var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//mongo connection
database.mongoConnect(); // Proceso para conexión a a base de datos
app.use('/usuarios', usuariosRouter);
app.use(auth);

//router 
app.use('/empleados', empleadosRouter);
app.use('/novios', noviosRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
