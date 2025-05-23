const jwt = require('jsonwebtoken');

// Repositories
const pointsRepository = require('../repositories/points.repository');
const usersBankRepository = require('../repositories/usersBank.repository');
const rewardsRepository = require('../repositories/rewards.repository');


class PointsService {
    async earn(type, amount, description, token) {
        const user = jwt.decode(token);
        const existingUsersBank = await usersBankRepository.findByUserId(user.userId);

        // Users balance is creating for first time
        if (!existingUsersBank) {
            return await usersBankRepository.create(user.userId, amount);
        }

        // Users balance updating as: balance = balance + amount
        await usersBankRepository.updateUp(user.userId, amount);

        return await pointsRepository.create(user.userId, type, amount, description);
    }

    async history(token) {
        const user = jwt.decode(token);
        const result = await pointsRepository.findByUserId(user.userId);

        return result;
    }

    async redeem(token, rewardId) {
        const user = jwt.decode(token);
        const existingUsersBank = await usersBankRepository.findByUserId(user.userId);
        const userPointBalance = existingUsersBank.balance;

        // Users balance is creating for first time
        if (!existingUsersBank) {
            return await usersBankRepository.create(user.userId, 0);
        }

        const rewardDetail = await rewardsRepository.findById(rewardId);
        const { id, points_cost, is_active, stock } = rewardDetail[0];

        if (!id) {
            throw new Error('REWARD_IS_NOT_FOUND')
        }

        if (!is_active) {
            throw new Error('REWARD_IS_NOT_ACTIVE')
        }

        if (userPointBalance < points_cost) {
            throw new Error('INSUFFICIENT_POINTS');
        }

        if (stock < 1) { // Checking stock
            throw new Error('INSUFFICIENT_STOCK');
        }

        const usersBankResult = await usersBankRepository.updateDown(user.userId, points_cost); // balance is decreasing
        const stockResult = await rewardsRepository.updateStock(user.userId); //decsreasing stock

        return { usersBankResult, stockResult }
    }
}

module.exports = new PointsService();