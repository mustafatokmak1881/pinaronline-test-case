
const userRepository = require('../repositories/user.repository');

class UserService {
    async createUser(userData){
        return await userRepository.create(userData)
    }
}

module.exports = new UserService();