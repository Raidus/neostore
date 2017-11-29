const express = require('express');
const path = require('path');
const logger = require('morgan');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver').v1;

// Config
const { NEO_URI, NEO_USER, NEO_PASS, APP_PORT } = require('./config/keys');

// // Neo4j
// const driver = neo4j.driver(NEO_URI, neo4j.auth.basic(NEO_USER, NEO_PASS));
// const session = driver.session();

const app = express();

// View engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Error logging
const loggerFile = new winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/error.log' })
  ]
});

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
const home = require('./routes/home');
app.use('/', home);

// Add Product Route
const product = require('./routes/product');
app.use('/product', product);

const merchant = require('./routes/merchant');
app.use('/merchant', merchant);

const selling = require('./routes/selling');
app.use('/selling', selling);

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  loggerFile.log('error', err.stack.split('\n'));

  // Respond to client
  res.status(status).json({
    ok: false,
    error: {
      message: error.message
    }
  });
});

// Start the server
const port = app.get('port') || APP_PORT;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
