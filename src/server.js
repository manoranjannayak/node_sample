import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import environment from '../environment';
import mongoose from './config/mongoose';
import error from './middlewares/error';
import routes from './app/routes';
import https from 'https';
import fs from 'fs';
import cron from './app/cron/index'

require('./config/user.passport')(passport);

// getting application environment
const env = process.env.NODE_ENV;
// getting application config based on environment
const envConfig = environment[env];
// setting port value
const port = envConfig.port || 3000;

const app = express();

if (!global.status_codes)
    global.status_codes = require('./app/class/Util/StatusCodes');

if (!global.custom_message)
    global.custom_message = require('./config/message');

if (!global.Response)
    global.Response = require('./app/class/Util/Response');

if (!global.config)
    global.config = require('./config/config');

mongoose.connect(envConfig, env);

// request logging. dev: console | production: file
app.use(morgan(envConfig.logs));


app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api routes
app.use('/', routes);
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);
//
app.use(passport.initialize());
// listen to requests
// cron.job.start();


app.listen(port, () =>
  console.log(`jwt-authorization Application listening on port ${port} !`),
)
module.exports = app;