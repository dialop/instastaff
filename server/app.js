// - MAIN EXPRESS SERVER -//

// Importing required modules
const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
const { auth } = require('express-openid-connect');
require('dotenv').config();

// Check environment variables
const requiredEnv = ['SECRET', 'BASE_URL', 'CLIENT_ID', 'ISSUER_BASE_URL'];
requiredEnv.forEach(env => {
  if (!process.env[env]) {
    console.error(`ERROR: Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

// Auth0 Configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// Database connection pool
const { pool } = require("./lib/db");

// Initialize Express app
const app = express();

// Setup view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Apply middlewares
app.use(cors());
app.use(auth(config));
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