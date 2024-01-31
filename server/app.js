// - MAIN EXPRESS SERVER -//
const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require('dotenv').config();
const cors = require('cors');
// const mailgun = require('mailgun-js');

const {pool} = require("./lib/db")



const app = express();

// Importing routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const calendarRouter = require("./routes/calendar")
const mapsRoutes = require('./routes/map');
const apiJobs = require('./routes/api/api_jobs');
const emailNotificationRouter = require('./routes/api/email_notification');

const { error } = require('console');

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "build")));

// API routes
app.use('/api/jobs', apiJobs(pool))
app.use('/api', mapsRoutes);
app.use("/api", indexRouter); 
app.use('/api', emailNotificationRouter);

//Calendar Route
app.use('/calendar', calendarRouter);


//setupMailgun

// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN
// });

// app.post('/api/send-email', (req, res) => {

//   mg.messages().send({
//     from: 'Admin, <instastaff@gmail.com>',
//     to: 'akhtyamovadiana@gmail.com',
//     subject: 'Your shift was booked',
//     text: 'Congratulations! Your shift has been accepted.'
//   },
//   (error, body) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send({message: 'Error sending email'});
//     } else {
//       console.log(body);
//       res.send({ message: 'Email sent'})
//     }
//   }
//   )
// })

// Serve the React application
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

// Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;