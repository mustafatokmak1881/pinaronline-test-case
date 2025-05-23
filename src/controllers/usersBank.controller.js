const usersBankService = require('../services/usersBank.service');

class UsersBankController {
    async balance(req, res) {
        const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Token is not found"
            });
        }


        try {
            const userBalance = await usersBankService.balance(token);

            res.status(200).json({
                status: 'success',
                message: 'User balance was taken successfully',
                data: userBalance
            });
        } catch (error) {
            res.status(409).json({
                status: 'fail',
                message: 'User balance is not taking',
                data: error.message
            });
        }

    }
}

module.exports = new UsersBankController();