// - MAIN EXPRESS SERVER -//
const express = require('express');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require('dotenv').config();

const {pool} = require("./lib/db")

const app = express();

// Importing routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const calendarRouter = require("./routes/calendar")
const mapsRoutes = require('./routes/map');
const apiJobs = require('./routes/api/api_jobs');



// //from calendar route 
//   app.get("/calendar", (req, res) => {
 
//     console.log("hello from calendar route");
//     //Edit user ID with $ in quary based on user cookies.
//     // const userId = req.params.user_id;
//     // console.log("Is it working?")

//     pool.query(
//       `
//     SELECT
//     job_postings.title AS occupation,
//     job_postings.date AS shift_date,
//     job_postings.start_time AS start_shift,
//     job_postings.duration AS duration,
//     job_postings.facility_name AS facility_name,
//     job_postings.facility_short_address AS address
//     FROM job_postings 
//     JOIN users
//     ON users.id = job_postings.user_id 
//     WHERE users.id = 1;
//     `
//     ).then(({ rows: calendar }) => {
//       console.log("row", calendar);
//       res.json(calendar);
//     })
//     .catch((error) => {
//       console.error("Error executing SQL query:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
 
//   });


// //end




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