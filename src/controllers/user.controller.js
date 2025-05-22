const userService = require('../services/user.service')
const { hashCompare } = require('../helper/hash')

class UserController {
    async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'user registered',
                data: { username: user.username }
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

    async delete(req, res) {
        try {
            await userService.deleteUser(req.body.username);

            return res.status(200).json({
                status: 'success',
                message: 'user deleted'
            });
        } catch (error) {
            return res.status(400).json({
                status: 'fail',
                message: 'user cannot delete',
                data: { error: error.message }
            });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await userService.validateUser(username, password);
            res.json({ success: true, user });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
}

module.exports = new UserController();