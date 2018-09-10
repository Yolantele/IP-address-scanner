const networkServices = require('../../services/networkServices');
const scannerService = require('../../SaveParseNetworkMap')

module.exports = {
  maps: {
    post: async (req, params, env, callback) => {
      const { err, data } = await networkServices.addNetworkDevicesToDB(
        params.ssid,
        params.devices,
        params.building,
      );
      callback(err, data);
    },
    get: (req, params, env, callback) => {
      networkServices.listAllNetworksDevices(callback)
    }
  },
  hello: {
    get: (req, params, env, callback) => {
      try {
        return callback(null, { message: "Hello, this is network-scanner server" });
      } catch (err) {
        return callback(err)
      }
    }
  },
  scan: {
    post: async (req, params, env, callback) => {
      var mapJson = req.body
      const { err, data } = await scannerService.parseNetworkData(mapJson); callback(err, data);
    }
  },
   summary: {
    get: async (req, params, env, callback) => {
      try {
        console.log('----------> params are', params)
        const res = await networkServices.getNetworksDataByDate(
          params.ssid,
          params.date_from,
          params.date_to
        );
        return callback(null, res);
      } catch (e) {
        return callback(e);
      }
    }
  }
};
