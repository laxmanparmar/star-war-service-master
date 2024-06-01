exports.up = knex =>
  knex.schema
  .createTable("planets", tbl => {
    tbl.increments("id");
    tbl.text("name", 128).notNullable();
    tbl.text("description", 128).notNullable();
    tbl.text("code", 128).notNullable().primary()
    .unsigned();;
    tbl.text("pictureUrl", 512).notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    tbl.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
  .createTable("characters", tbl => {
    tbl.increments().primary()
    .unsigned();
    tbl.text("name", 128).notNullable();
    tbl.text("description", 128).notNullable();
    tbl.text("pictureUrl", 512).notNullable();
    tbl
      .text('planet')
      .unsigned()
      .index()
      .references('code')
      .inTable('planets')
      .onDelete('SET NULL');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    tbl.timestamp('updatedAt').defaultTo(knex.fn.now());
  })
  .createTable("friends", tbl => {
    tbl.increments().primary();
    tbl
        .integer('character_id')
        .references('id')
        .inTable('characters')
    tbl
        .integer('friend_id')
        .references('id')
        .inTable('characters')
  });;

exports.down = knex => knex.schema
.dropTableIfExists("friends")
.dropTableIfExists("characters")
.dropTableIfExists("planets");
