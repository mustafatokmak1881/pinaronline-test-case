/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('rewards', (table) => {
        table.specificType('id', 'serial primary key');
        table.string('name').notNullable();
        table.string('description');
        table.integer('pointsCost').notNullable();
        table.boolean('isActive').notNullable().defaultTo(true);
        table.integer('stock').notNullable().defaultTo(0);
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
        .then(() => {
            return knex('rewards').insert([
                {
                    name: 'Mini Ramazan Paketi',
                    description: 'Ramazanın bu güzel günlerinde ...',
                    pointsCost: 300,
                    isActive: true,
                    stock: 1000
                },
                {
                    name: 'Yılbaşı Hediye Paketi ',
                    description: 'Efsane cumaya yaklaşılırken ...',
                    pointsCost: 5000,
                    isActive: true,
                    stock: 1000
                },
                {
                    name: '19 Mayıs Gençlik Paketi',
                    description: 'Gençlerimize en özel günlerinde...',
                    pointsCost: 200,
                    isActive: false,
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
