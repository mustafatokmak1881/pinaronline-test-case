const userService = require('../services/user.service')

class UserController {
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'user registered',
            });
        } catch (error) {
            switch (error.message) {
                case 'USERNAME_ALREADY_EXISTS':
                    return res.status(409).json({
                        status: 'fail',
                        message: error.message,
                    });
                default:
                    return res.status(409).json({
                        status: 'fail',
                        message: error.message,
                    });
            }

        }
    }
}

module.exports = new UserController();