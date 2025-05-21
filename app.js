// Node Modules
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Variables
const PORT = process.env.PORT || 3000;
const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 request limit for per 15 minutes
    message: "Too many requests from this IP, please try again after 15 minutes"
});

// Middlware Files
const loggerMiddleware = require('./src/middlewares/logger.middleware');

// Middlewares
app.use(helmet()); // Protect from Xss and etc.
app.use(limiter); // Limit for ddos/botnet attck or too many request
app.use(cors()); // We need to  add origin at prod. This is for test only
app.use(express.json());
app.use(loggerMiddleware); // No need to this, but probably we will need after.

// Route Files
const homeRoutes = require('./src/routes/home.routes');
const authRoutes = require('./src/routes/auth.routes');
const errorRoutes = require('./src/routes/error.routes');

// Routes
app.use('/', homeRoutes);
app.use('/auth', authRoutes);


// Errors
app.use(errorRoutes);

// Listen
app.listen(PORT, () => console.log(`Listening: ${PORT}`));

module.exports = app;