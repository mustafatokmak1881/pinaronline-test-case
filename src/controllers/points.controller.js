const pointsService = require('../services/points.service');

class PointsController {
    async earn(req, res) {
        const { type, amount, description } = req.body;

        if (!type) {
            return res.status(409).json({
                status: 'fail',
                message: 'type is required'
            });
        }

        if (!amount) {
            return res.status(409).json({
                status: 'fail',
                message: 'amount is required'
            });
        }

        if (!description) {
            return res.status(409).json({
                status: 'fail',
                message: 'description is required'
            });
        }
       const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Token is not found"
            });
        }
        
        try {
            const result = await pointsService.earn(type, amount, description, token);
            return res.status(200).json({
                status: 'success',
                message: 'Points is saved',
                data: result
            });
        } catch (error) {

            return res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async history(req, res) {
        const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Token is not found"
            });
        }

        try {
            const history = await pointsService.history(token);

            res.status(200).json({
                status: 'success',
                message: 'Point history Listed',
                data: history
            });
        } catch (error) {
            res.status(409).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async redeem(req, res) {
        const token = req.headers['authorization'].split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "Token is not found"
            });
        }

        const { rewardId } = req.body;

        if (!rewardId) {
            return res.status(400).json({
                status: "fail",
                message: "rewardId not found"
            });
        }

        try {
            const redeemResult = await pointsService.redeem(token, rewardId);

            res.status(200).json({
                status: "success",
                message: "Redeem process successfuly",
                data: redeemResult
            });
        }
        catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message
            });
        }
    }
}

module.exports = new PointsController();