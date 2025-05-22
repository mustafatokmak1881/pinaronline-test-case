const userService = require('../services/user.service');

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
            const result = await userService.validateUser(username, password);

            return res.json({
                status: 'success',
                message: "Access granted",
                token: result.token
            });
        } catch (error) {
            return res.status(401).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async profile(req, res) {
        const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Token not found"
            });
        }

        try {

            const result = await userService.profilePage(token);
            res.status(200).json({
                status: "success",
                message: "Profile Page",
                data: result
            });
        }
        catch (error) {

        }
    }
}

module.exports = new UserController();