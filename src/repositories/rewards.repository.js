const pool = require('../config/database');

class RewardsRepository {
    constructor() {
        this.tableName = 'rewards';
        this.pool = pool;
    }

    async findAll() {
        const result = await this.pool.query(`SELECT id, name, description FROM ${this.tableName} WHERE is_active = true order by id DESC`);
        return result.rows;
    }

    async findById(id) {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return result.rows;
    }

      async updateStock(redeemId) {
        const result = await this.pool.query(`UPDATE ${this.tableName} SET stock = stock - 1 WHERE id = $1 RETURNING *`, [redeemId]);
        return result.rows[0];
    }

}

module.exports = new RewardsRepository();