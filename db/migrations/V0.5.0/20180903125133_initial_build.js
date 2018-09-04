exports.up = (knex, Promise) =>
  knex.schema.createTable("network_devices", table => {
    table.increments("id").primary();
    table.text("ssid");
    table.text("devices");
    table.text("building");
    table.timestamps(true, true);
  })

exports.down = (knex, Promise) => knex.schema.dropTable("netwrok_devices")
