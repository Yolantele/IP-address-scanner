const dbServices = require("./db/sql")

const NETWORK_TABLE = "network_devices";
const WIFI_TABLE = "wifi_speed_tests";

const VALID_REPORT_TYPES = {
  "YYYY-MM-DD": true,
  "YYYY-MM-DD:HH": true,
  HH: true,
  hh24: true
};

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

  addWifiSpeedToDB( wifiIP, wifiDataJson, building, timestamp, callback) {
    dbServices.insert(
      WIFI_TABLE,
      {wifi_ip: wifiIP, wifi_speed_json: wifiDataJson, building: building, created_at: timestamp},
      (err, wifi) => {
        if (err) {
          return callback( {error: "Could not add wifi speed data to DB"});
        }
        return callback(null, wifi);
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
  },

  async getNetworksDataByDate(
    ssid,
    dateFrom,
    dateTo) {

    var query = dbServices.knex(NETWORK_TABLE).select(['ssid', 'created_at', 'devices', 'building'])

    query = query
      .max("devices")
      .min("devices")
      .avg("devices")
      .where({
        ssid: ssid 
      });

    if (ssid){
      query = query.where("ssid", "=", ssid)
    }

    if (dateFrom) {
      query = query.where("created_at", ">=", dateFrom);
    }

    if (dateTo) {
      query = query.where("created_at", "<=", dateTo);
    }

    query = query.groupBy("ssid");
    query = query.groupBy("created_at");
    query = query.groupBy("devices");
    query = query.groupBy("building");
    query = query.orderBy("created_at", "asc");


    return query
      .then(results => {
        console.log(results)
        // Got the results - turn them into data points
        var data = {
          entries: []
        };

        var overallMax = null;
        var overallMin = null;
        var overall = null;

        var overallEntries = results.length

        results.forEach(result => {
          if ( data.entries.length === 0 || data.entries[data.entries.length - 1].ssid != result.ssid
          ) {
            data.entries.push({
              ssid: result.ssid,
              data_points: []
            });
          }

          data.entries[data.entries.length - 1].data_points.push({
            created_at: result.created_at,
            devices: result.devices,
          });

          if (overallMin == null || result.min < overallMin) {
            overallMin = result.min;
          } else {
            overallMin += result.min;
          }

          if (overallMax == null || result.max > overallMax) {
            overallMax = result.max;
          } else {
            overallMax += result.max;
          }

          overall += result.devices

        });

        data.totals = {
          max: overallMax,
          min: overallMin,
          avg: overall / overallEntries,
        };

        return data;
      })
      .catch(err => {
        console.error(err);
        throw "Could not run query";
      });
  }
}
