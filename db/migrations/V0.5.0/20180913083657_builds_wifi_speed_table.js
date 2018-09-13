exports.up = (knex, Promise) => 
  knex.schema.createTable("wifi_speed_tests", table => {
    table.increments("id").primary();
    table.text("wifi_ip");
    table.json("wifi_speed_json");
    table.text("building");
    table.timestamps(true, true);
  });

exports.down = (knex, Promise) => knex.schema.dropTable("wifi_speed_tests");
