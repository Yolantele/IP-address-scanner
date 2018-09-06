const networkServices = require('./services/networkServices')
const BUILDING = "Morelands, Jigsaw XYZ"


const parseNetworkData = networkMap => {
  Object.entries(networkMap).forEach(([networkName, devicesAccrossNetworks]) => {
    networkServices.addNetworkDevicesToDB(networkName, devicesAccrossNetworks, BUILDING, 
      (err, networkData) => {
        if (err) {
          console.log("Could not add network data to DB ----->", err);
        }
      return callback(null, networkData);
    })

  })
}

module.exports = {
  parseNetworkData
}