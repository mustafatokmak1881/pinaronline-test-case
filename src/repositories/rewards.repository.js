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

}

module.exports = new RewardsRepository();