<<<<<<< HEAD
// - MAIN EXPRESS SERVER -//
=======
>>>>>>> d5915888b24992be404431b52bb7c2ac4a8f889f
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const {pool} = require("./lib/db")

const app = express();

// Importing routes
<<<<<<< HEAD
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const calendarRouter = require("./routes/calendar")
=======
const indexRouter = require('./routes/index');
>>>>>>> d5915888b24992be404431b52bb7c2ac4a8f889f
const mapsRoutes = require('./routes/map');
const directionsRoutes = require('./routes/directions');

const app = express();
const apiJobs = require('./routes/api/api_jobs');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// API routes
<<<<<<< HEAD
app.use('/api/jobs', apiJobs(pool))
=======
app.use('/api', indexRouter);
>>>>>>> d5915888b24992be404431b52bb7c2ac4a8f889f
app.use('/api', mapsRoutes);
app.use('/api', directionsRoutes);

<<<<<<< HEAD

//Calendar Route
app.use('/calendar', calendarRouter);

// Serve the React application
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

// Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// Error handler
=======
// Serve the React application
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Error handler (should be at the end)
>>>>>>> d5915888b24992be404431b52bb7c2ac4a8f889f
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
