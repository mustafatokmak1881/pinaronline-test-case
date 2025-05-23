const pool = require('../config/database');

class UsersBanksRepository {
    constructor() {
        this.tableName = 'users_bank';
        this.pool = pool;
    }

    async findByUserId(userId) {
        const result = await this.pool.query(`SELECT user_id, balance FROM ${this.tableName} WHERE user_id = $1`, [userId]);
        return result.rows[0];
    }

    async create(userId, amount) {
        const result = await this.pool.query(
            `INSERT INTO ${this.tableName}(user_id, balance) VALUES($1, $2) RETURNING *`,
            [userId, amount]
        );
        return result.rows[0];
    }

    async updateUp(userId, amount, symbol) {
        const result = await this.pool.query(`UPDATE ${this.tableName} SET balance = balance + $1 WHERE user_id = $2 RETURNING *`, [amount, userId]);
        return result.rows[0];
    }

    async updateDown(userId, amount, symbol) {
        const result = await this.pool.query(`UPDATE ${this.tableName} SET balance = balance - $1 WHERE user_id = $2 RETURNING *`, [amount, userId]);
        return result.rows[0];
    }

}

module.exports = new UsersBanksRepository();