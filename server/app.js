// - MAIN EXPRESS SERVER -//
const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require('dotenv').config();

const {pool} = require("./lib/db")
// Importing routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const calendarRouter = require("./routes/calendar")
const mapsRoutes = require('./routes/map');
const apiJobs = require('./routes/api/api_jobs');

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middlewares
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
app.use('/calendar', calendarRouter);
app.use('/user', userRouter);

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