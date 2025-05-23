const rewardsService = require('../services/rewards.service');

class RewardsController {
    async rewards(req, res) {
        const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Token not found"
            });
        }

        try {
            const rewards = await rewardsService.rewards(token);

            res.status(200).json({
                status: 'success',
                message: 'Rewards Listed',
                data: rewards
            });
        }
        catch (error) {
            res.status(409).json({
                status: 'fail',
                message: error.message
            })
        }
    }
}

module.exports = new RewardsController();