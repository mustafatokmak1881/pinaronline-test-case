const jwt = require('jsonwebtoken');

// Repositories
const usersBankRepository = require('../repositories/usersBank.repository');

class UsersBankService {


    async balance(token) {
        const user = jwt.decode(token);
        const result = await usersBankRepository.findByUserId(user.userId);

        return result;
    }
}

module.exports = new UsersBankService();