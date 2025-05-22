const bcrypt = require('bcrypt');

class PasswordHasher {
    constructor() {
        this.saltOrRounds = 10;
        this.password = process.env.BCRYPT_PASSWORD;
    }
    async create() {
        return await bcrypt.hash(this.password, this.saltOrRounds);
    }

    async compare(password, hash) {
        return await bcrypt.compare(password, hash)
    }
}

module.exports = new PasswordHasher;


