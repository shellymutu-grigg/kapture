
exports.up = knex => {
  return knex.schema.createTable('birds', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('ignoa')
    table.string('description')
    table.string('image')
    table.string('found_in')
    table.string('sound')
    table.string('conservation_status')
    table.string('threats')
    table.integer('colour_id')
    table.integer('size_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('birds')
};
