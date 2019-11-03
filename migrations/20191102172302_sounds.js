const languages = require('google-tts-languages');

const languageCodes = languages.map(l => l.code);

exports.up = function(knex) {
  return knex.schema.createTable('requests', table => {
    table.uuid('id').primary();
    table.enum('status', ['Pending', 'Done', 'Error']).defaultTo('Pending');
    table.enum('voice', languageCodes);
    table.string('message');
    table.string('text').notNullable();
    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());

    table.unique(['text', 'voice']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('requests');
};
