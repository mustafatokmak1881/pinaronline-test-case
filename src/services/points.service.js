const jwt = require('jsonwebtoken');

// Repositories
const pointsRepository = require('../repositories/points.repository');
const usersBankRepository = require('../repositories/usersBank.repository');

class PointsService {
    async earn(userId, type, amount, description) {
        const existingUsersBank = await usersBankRepository.findByUserId(userId);

        // Users balance is creating for first time
        if (!existingUsersBank) {
            return await usersBankRepository.create(userId, amount);
        }

        // Users balance updating as: balance = balance + amount
        await usersBankRepository.updateUp(userId, amount);

        return await pointsRepository.create(userId, type, amount, description);
    }

    async history(token) {
        const user = jwt.decode(token);
        const result = await pointsRepository.findByUserId(user.userId);

        return result;
    }
}

module.exports = new PointsService();