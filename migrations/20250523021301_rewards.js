/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('rewards', (table) => {
        table.specificType('id', 'serial primary key');
        table.string('name').notNullable();
        table.string('description');
        table.integer('points_cost').notNullable();
        table.boolean('is_active').notNullable().defaultTo(true);
        table.integer('stock').notNullable().defaultTo(0);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
        .then(() => {
            return knex('rewards').insert([
                {
                    name: 'Mini Ramazan Paketi',
                    description: 'Ramazanın bu güzel günlerinde ...',
                    points_cost: 300,
                    is_active: true,
                    stock: 1000
                },
                {
                    name: 'Yılbaşı Hediye Paketi ',
                    description: "2026'a yaklaşılırken ...",
                    points_cost: 5000,
                    is_active: true,
                    stock: 1000
                },
                {
                    name: '19 Mayıs Gençlik Paketi',
                    description: 'Gençlerimize en özel günlerinde...',
                    points_cost: 200,
                    is_active: false,
                    stock: 500
                }
            ]);
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('rewards');
};
