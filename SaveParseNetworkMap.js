const networkServices = require('./services/networkServices')

const BUILDING = "Morelands, Jigsaw XYZ"


const parseNetworkData = mapName => {
  let devicesAccrossNetworks = 0

  Object.entries(mapName).forEach(([network, networkValue]) => {
    let devices = 0
    Object.entries(networkValue).forEach(([ssid, values]) => {
      if (typeof values['devices'] === 'object') {
        devices += Object.keys(values['devices']).length
      }
    })
    if (devices === 0) {
      null
    } else {
      devicesAccrossNetworks += devices
      networkServices.addNetworkDevicesToDB(network, devicesAccrossNetworks, BUILDING, 
        (err, networkData) => {
          if (err) {
            console.log("Could not add network data to DB ----->", err);
          }
        return callback(null, networkData);
      })
    }
  })
}

module.exports = {
  parseNetworkData,
}