const userService = require('../services/user.service')

class UserController {
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

module.exports = new UserController();