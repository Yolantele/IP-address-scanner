const dbServices = require("./db/sql")

const NETWORK_TABLE = "network_devices";

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
    dateFrom,
    dateTo,
    reportType,
  ) {
    if (reportType && !VALID_REPORT_TYPES[reportType]) {
      throw "Invalid report type";
    }


    if (reportType) {
      select.push(
        dbServices.knex.raw(
          "to_char(timestamp, '" + reportType + "') as timestamp"
        )
      );
    } else {
      select.push("timestamp");
    }

    var query = dbServices.knex(NETWORK_TABLE).select(select);

    query = query
      .max("devices")
      .min("devices")
      .avg("devices")
      .where({
        building_instance_id: buildingInstanceId
      });

    if (dateFrom) {
      query = query.where("timestamp", ">=", dateFrom);
    }

    if (dateTo) {
      query = query.where("timestamp", "<=", dateTo);
    }


    if (reportType) {
      query = query.groupByRaw("to_char(timestamp, '" + reportType + "')");
    } else {
      query = query.groupBy("timestamp");
    }

    query = query.orderBy("primary_tag", "asc");
    query = query.orderBy("floor", "asc");
    query = query.orderBy("timestamp", "asc");

    return query
      .then(results => {
        // Got the results - turn them into data points
        var data = {
          entries: []
        };

        var overallMax = null;
        var overallMin = null;

        results.forEach(result => {
          if (
            data.entries.length === 0 ||
            data.entries[data.entries.length - 1].floor != result.floor ||
            data.entries[data.entries.length - 1].primary_tag !=
              result.primary_tag
          ) {
            data.entries.push({
              primary_tag: result.primary_tag,
              floor: result.floor,
              data_points: []
            });
          }

          data.entries[data.entries.length - 1].data_points.push({
            timestamp: result.timestamp,
            max: result.max,
            min: result.min,
            avg: result.avg
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
        });

        data.totals = {
          max: overallMax,
          min: overallMin
        };

        return data;
      })
      .catch(err => {
        console.error(err);
        throw "Could not run query";
      });
  }
}
