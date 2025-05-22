
const userRepository = require('../repositories/user.repository');

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }
    async createUser(userData) {
        if (userData.password.length < 6) {
            throw new Error("PASSWORD_TOO_SHORT");
        }
        const existingUserName = await userRepository.findByUsername(userData.username);

        if (existingUserName) {
            throw new Error("USERNAME_ALREADY_EXISTS");
        }

        const existingEmail = await userRepository.findByEmail(userData.email);

        if(existingEmail) {
            throw new Error('EMAIL_ALREADY_EXISTS')
        }

        return await userRepository.create(userData)
    }
}

module.exports = new UserService();