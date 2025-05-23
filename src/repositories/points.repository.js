const pool = require('../config/database');

class PointsRepository {
    constructor() {
        this.tableName = 'points';
        this.pool = pool;
    }

    async findAll() {
        const result = await this.pool.query(`SELECT * FROM ${this.tableName}`);
        return result.rows;
    }

    async create(userId, type, amount, description) {
        const result = await this.pool.query(
            `INSERT INTO ${this.tableName}(user_id, type, amount, description) VALUES($1, $2, $3, $4) RETURNING *`,
            [userId, type, amount, description]
        );
        return result.rows[0];
    }

    async findByUserId(userId){
        const result = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE user_id = $1 order by id DESC`, [userId]);
        return result.rows[0];
    }

}

module.exports = new PointsRepository();