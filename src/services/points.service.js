const jwt = require('jsonwebtoken');

const pointsRepository = require('../repositories/points.repository');

class PointsService {
    async earn(userId, type, amount, description) {
        return await pointsRepository.create(userId, type, amount, description);
    }

    async history(token) {
        const user = jwt.decode(token);
        const result = await pointsRepository.findByUserId(user.userId)

        return result;
    }
}

module.exports = new PointsService();