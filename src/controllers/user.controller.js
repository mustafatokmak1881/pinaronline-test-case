const userService = require('../services/user.service')

class UserController {
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            switch (error.message) {
                case 'USERNAME_ALREADY_EXISTS':
                    return res.status(409).json({ error: error.message });
                default:
                    return res.status(400).json({ error: error.message });
            }

        }
    }
}

module.exports = new UserController();