// Node Modules
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Variables
const PORT = process.env.PORT || 3000;
const app = express();
const apiRouter = express.Router();

// Rate Limit Definitions
const { rateLimitSettings } = require('./src/config/settings')
const limiter = rateLimit(rateLimitSettings);

// Swagger Definitions
const { swaggerSettings } = require('./src/config/settings')
const specs = swaggerJsdoc(swaggerSettings);


// Middlware Files
const loggerMiddleware = require('./src/middlewares/logger.middleware');

// Middlewares
app.use(helmet()); // Protect from Xss and etc.
app.use(limiter); // Limit for ddos/botnet attck or too many request
app.use(cors()); // We need to  add origin at prod. This is for test only
app.use(express.json());
app.use(loggerMiddleware); // No need to this, but probably we will need after.

// Route Files
const userRoutes = require('./src/routes/user.routes');
const pointsRoutes = require('./src/routes/points.routes');
const rewardsRoutes = require('./src/routes/rewards.routes');
const errorRoutes = require('./src/routes/error.routes');

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', apiRouter); // Prefix for /api routes
apiRouter.use('/users', userRoutes); // Routes for users
apiRouter.use('/points', pointsRoutes); // Routes for points
apiRouter.use('/rewards', rewardsRoutes) // Routes for rewards


// Errors
app.use(errorRoutes);

// Listen
app.listen(PORT, () => console.log(`Listening: ${PORT}`));

module.exports = app;