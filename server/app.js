const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importing routes
const indexRouter = require('./routes/index');
const mapsRoutes = require('./routes/map');
const directionsRoutes = require('./routes/directions');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.use('/api', indexRouter);
app.use('/api', mapsRoutes);
app.use('/api', directionsRoutes);

// Serve the React application
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Error handler (should be at the end)
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
