// - MAIN EXPRESS SERVER -//

// Importing required modules
const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
require('dotenv').config();

// Database connection pool
const { pool } = require("./lib/db");

// Initialize Express app
const app = express();

// Importing routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const calendarRouter = require("./routes/calendar")
// const usersRouter = require("./routes/users");
// const calendarRouter = require("./routes/calendar");
const mapsRoutes = require('./routes/map');
const apiJobs = require('./routes/api/api_jobs');
const emailNotificationRouter = require('./routes/api/email_notification');

const { error } = require('console');

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Apply middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build"))); // Serve static files

// Import routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const calendarRouter = require("./routes/calendar");
const mapsRoutes = require('./routes/map');
const apiJobs = require('./routes/api/api_jobs');

// Define API routes
app.use('/api/jobs', apiJobs(pool));
app.use('/api', mapsRoutes);
app.use("/api", indexRouter);
app.use('/api', emailNotificationRouter);
app.use('/calendar', calendarRouter);
app.use('/user', userRouter(pool));

// Error handler middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).render("error");
});

module.exports = app;

// Commented code:

// Serve the React application
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

// Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.post('/user', (req, res) =>
//   console.log(req.body)
// ); 