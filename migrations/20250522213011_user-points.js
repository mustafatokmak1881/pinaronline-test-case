/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('points', (table) => {
        table.specificType('id', 'serial primary key')
        table.string('user_id').notNullable();
        table.string('type').notNullable();
        table.integer('amount').notNullable();
        table.string('description').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('points');
};
