// THIS FILE WILL CONTAIN CONFIGURATION WHICH IS RELATED TO EXPRESS
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const userRouter = require('./routes/userRoutes');
const tutorRouter = require('./routes/tutorRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');
const subscriptionPlanRouter = require('./routes/subscriptionPlanRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const flashCardRouter = require('./routes/flashCardRoutes');

const AppError = require('./utils/appError');

// express.json() is a middleware, it parses the json in the incoming req object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IT ENABLES US TO USE DATA RECEIVED IN REQ.BODY
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// TO ACCESS COOKIE AT BACKEND
app.use(cookieParser());

// MOUNTING ROUTERS
app.use('/api/users', userRouter);
app.use('/api/tutors', tutorRouter);
app.use('/api/subscription', subscriptionRouter);
app.use('/api/subscriptionPlan', subscriptionPlanRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/flashCard', flashCardRouter);

// A MIDDLEWARE WHICH RUNS A UNIDENFIED ROUTE IS CALLED
app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} on this server!`, 404));
});

// Catching Errors -> a very basic error handler
app.use((err, req, res, next) => {
  console.log('Inside Error Handler function....');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log(err);

  // WHEN DATA IS REQUESTED THROUGH API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      err: err.status,
      errror: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // WHEN PAGE IS REQUESTED
  else {
    if (err.statusCode === 401) {
      return res.status(err.statusCode).render('login', {
        title: 'Login to Continue!!',
      });
    }

    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!!',
      message: err.message,
    });
  }
});

module.exports = app;

// END OF ERROR HANDLER FUNC
