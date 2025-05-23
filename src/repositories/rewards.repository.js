const pool = require('../config/database');

class RewardsRepository {
    constructor() {
        this.tableName = 'rewards';
        this.pool = pool;
    }

    async findAll() {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        return result.rows;
    }


}

module.exports = new RewardsRepository();