exports.up = function(knex) {
  return knex.schema.createTable('requests', table => {
    table.uuid('id').primary();
    table.enum('status', ['Pending', 'Done', 'Error']).defaultTo('Pending');
    table.string('voice');
    table.string('message');
    table.string('text').notNullable();
    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());

    table.unique(['text', 'voice']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('requests');
};
