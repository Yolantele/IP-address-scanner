const networkServices = require('../../services/networkServices');

module.exports = {
  maps: {
    post: async (req, params, env, callback) => {
      const {err, data } = await networkServices.addNetworkDevicesToDB(
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
  }
};
