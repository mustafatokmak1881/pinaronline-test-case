const pool = require('../config/database');
const helper = require('../helper/hash');

class UserRepository {
    constructor() {
        this.tableName = 'users';
        this.pool = pool;
    }

    async create({ username, email, password }) {
        const hashedPassword = await helper.create(password)
        const result = await this.pool.query(
            `INSERT INTO ${this.tableName}(username, email, password) VALUES($1, $2, $3) RETURNING *`,
            [username, email, hashedPassword]
        );
        return result.rows[0];
    }

    async findAll() {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        return result.rows;
    }

    async findByUsername(username) {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE username=$1`, [username]);
        return result.rows[0];
    }

    async findByEmail(email) {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE email=$1`, [email]);
        return result.rows[0];
    }

}

module.exports = new UserRepository();