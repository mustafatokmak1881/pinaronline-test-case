const jwt = require('jsonwebtoken');

// Repositories
const rewardsRepository = require('../repositories/rewards.repository');

class UsersBankService {
    async rewards(token) {
        const user = jwt.decode(token);
        const result = await rewardsRepository.findAll();

        return result;
    }

    async rewardsById(id) {
        const result = await rewardsRepository.findById(id);

        return result;
    }
}

module.exports = new UsersBankService();