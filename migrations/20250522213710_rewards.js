/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('rewards', table => {
        table.specificType('id', 'serial primary key');
        table.string('name').notNullable();
        table.string('description');
        table.integer('pointsCost').notNullable().defaultTo(0);
        table.boolean('isActive').notNullable();
        table.integer('stock').notNullable().defaultTo(0);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
