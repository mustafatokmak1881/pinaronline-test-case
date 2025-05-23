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

    async rewardsById(req, res) {
        const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Token not found"
            });
        }

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'fail',
                message: 'invalid id'
            });
        }

        try {
            const rewards = await rewardsService.rewardsById(id);

            res.status(200).json({
                status: 'success',
                message: 'Reward Details',
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

    async rewardByPoints(req, res) {
        const token = req.headers['authorization'].split(' ')[1];
        const { rewardId, points } = req.body;

        if (!rewardId) {
            return res.status(400).json({
                status: "fail",
                message: "rewardId not found"
            });
        }

        try {
            const result = await rewardsService.rewardsByPoints(rewardId, points, token);

            res.status(200).json({
                status: 'success',
                message: result
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