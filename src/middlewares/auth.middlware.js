const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const token = req.headers?.authorization?.split(" ")[1];

    try {
        jwt.verify(token, secretKey);

        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: error.message,

        })
    }
}

module.exports = authMiddleware;