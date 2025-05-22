/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('user-points', (table) => {
        table.specificType('id', 'serial primary key')
        table.string('userId').notNullable();
        table.string('type').notNullable();
        table.integer('amount').notNullable();
        table.string('description');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user-points');
};
