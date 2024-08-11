var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const setupSwagger = require('./config/swagger')
// var POOL = require('./config/db');

var INDEX_ROUTES = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Check Connection to Database
// POOL.connect((err) => {
// 	if (err) {
// 		return console.error('Error acquiring client', err
// 		);
// 	}
// 	console.log('Connected to Database');
// });

//setup swagger
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

app.use('/', INDEX_ROUTES);

module.exports = app;
