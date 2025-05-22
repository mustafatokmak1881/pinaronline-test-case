
const userRepository = require('../repositories/user.repository');

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }
    async createUser(userData) {
        const existingUser = await userRepository.findByUsername(userData.username);

        if (existingUser) {
            throw new Error("USERNAME_ALREADY_EXISTS");
        }

        if (userData.password.length < 6) {
            throw new Error("PASSWORD_TOO_SHORT");
        }

        return await userRepository.create(userData)
    }
}

module.exports = new UserService();