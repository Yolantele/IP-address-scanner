exports.up = (knex, Promise) =>
  knex.schema.createTable("network_devices", table => {
    table.increments("id").primary();
    table.text("ssid");
    table.integer("devices");
    table.text("building");
    table.timestamps(true, true);
  })

exports.down = (knex, Promise) => knex.schema.dropTable("network_devices")
