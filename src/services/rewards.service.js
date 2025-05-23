const jwt = require('jsonwebtoken');

// Repositories
const rewardsRepository = require('../repositories/rewards.repository');
const usersBankRepository = require('../repositories/usersBank.repository');

class UsersBankService {
    async rewards() {
        const result = await rewardsRepository.findAll();

        return result;
    }

    async rewardsById(id) {
        const result = await rewardsRepository.findById(id);

        return result;
    }

    async rewardsByPoints(rewardId, points, token) {
        const rewardDetail = await rewardsRepository.findByIdAsArray(rewardId);

        if (!rewardDetail) {
            throw new Error('REWARD_IS_NOT_FOUND')
        }

        const { id, points_cost, is_active, stock } = rewardDetail;

        if (!is_active) {
            throw new Error('REWARD_IS_NOT_ACTIVE')
        }

        if (points < points_cost) {
            throw new Error('POINTS_IS_NOT ENOUGH_FOR_THIS_REWARD');
        }

        if (stock < 1) { // Checking stock
            throw new Error('INSUFFICIENT_STOCK');
        }

        return 'POINTS_ENOUGH_FOR_THIS_REWARD';

    }
}

module.exports = new UsersBankService();