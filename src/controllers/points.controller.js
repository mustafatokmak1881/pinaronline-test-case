const pointsService = require('../services/points.service');

class PointsController {
    async earn(req, res) {
        const { userId, type, amount, description } = req.body;
        
        try {
            const result = await pointsService.earn(userId, type, amount, description);

           return  res.status(200).json({
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
}

module.exports = new PointsController();