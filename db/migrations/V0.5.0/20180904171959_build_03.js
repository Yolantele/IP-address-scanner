exports.up = (knex, Promise) =>
  knex.schema.table("network_devices", table => {
    table.dropColumn(true);
    table.timestamps(true, true);
  });

exports.down = (knex, Promise) =>
  knex.schema.table("network_devices", table => {
    table.dropColumn(true);
    table.timestamps(true, true);
  });
