

const pointsRepository = require('../repositories/points.repository');

class PointsService {
    async earn(userId, type, amount, description) {
        return await pointsRepository.create(userId, type, amount, description);
    }
}

module.exports = new PointsService();