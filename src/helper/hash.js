const bcrypt = require('bcrypt');

class PasswordHasher {
    constructor() {
        this.saltRounds = 10;
    }

    async hashCreate(password) {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async hashCompare(plainTextPassword, hashedPassword) {
        if (!plainTextPassword || !hashedPassword) {
            throw new Error("Password and hash cannot be empty!");
        }
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }
}

module.exports = new PasswordHasher();