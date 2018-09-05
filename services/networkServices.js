const dbServices = require("./db/sql")

const NETWORK_TABLE = "network_devices";

module.exports = {
  addNetworkDevicesToDB (ssid, devices, building, callback) {
    // Create new record
    dbServices.insert(
      NETWORK_TABLE, 
      {ssid: ssid, devices: devices, building: building},
      (err, network) => {
        if (err) {
          return callback({ error: "Could not add network with devices to DB" });
        }
        return callback(null, network);
      }
    );
  },

  listAllNetworksDevices (callback) {
    dbServices
      .knex(NETWORK_TABLE)
      .select('ssid', 'devices', 'building', 'created_at' )
      .orderBy('created_at', 'desc')
      .then(instances => {
        return callback(null, instances);
      })
      .catch(err => {
        console.error(err);
        return callback({ error: "Could not run query" });
      });
  }
}
