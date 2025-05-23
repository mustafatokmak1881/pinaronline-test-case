const pointsService = require('../services/points.service');

class PointsController {
    async earn(req, res) {
        const { userId, type, amount, description } = req.body;

        if (!userId) {
            return res.status(409).json({
                status: 'fail',
                message: 'userId is required'
            });
        }

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

        try {
            const result = await pointsService.earn(userId, type, amount, description);
            return res.status(200).json({
                status: 'success',
                message: 'Points is saved',
                data: result
            });
        } catch (error) {

            return res.status(200).json({
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
                message: "Token not found"
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
}

module.exports = new PointsController();