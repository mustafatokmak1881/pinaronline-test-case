const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/user.repository');
const helper = require('../helper/hash');

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

        if (existingEmail) {
            throw new Error('EMAIL_ALREADY_EXISTS')
        }

        return await userRepository.create(userData)
    }

    async deleteUser(username) {
        return await userRepository.deleteByUsername(username);
    }

    async validateUser(username, password) {
        const user = await userRepository.findByUsername(username);

        if (!user) {
            throw new Error('User not found');
        }

        // BCrypt ile şifreyi karşılaştır
        const isPasswordValid = await helper.hashCompare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const secretKey = process.env.SECRET_KEY;

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })

        return { user, token }; // Validation başarılı ise user objesini döndür
    }

    async profilePage(token){
        const user = jwt.decode(token);
        const result = await userRepository.findById(user.userId)

        return result;
    }
}

module.exports = new UserService();