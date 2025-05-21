const loggerMiddleware = (req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`); // We can use graylog . for logging maybe later.
    next();
}

module.exports = loggerMiddleware;