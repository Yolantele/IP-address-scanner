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
      // console.log(mapJson)
      const { err, data } = await scannerService.parseNetworkData(req.body.data); callback(err, data);
    }
  }
};
