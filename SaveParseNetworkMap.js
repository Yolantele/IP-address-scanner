const networkServices = require('./services/networkServices')
const BUILDING = "Morelands, Jigsaw XYZ"


const parseNetworkData = networkMap => {
  Object.entries(networkMap).forEach(([networkName, devicesAccrossNetworks]) => {
    networkServices.addNetworkDevicesToDB(networkName, devicesAccrossNetworks, BUILDING, 
      (err, networkData) => {
        if (err) {
          console.log("Could not add network data to DB ----->", err);
        }
      return (null, networkData);
    })

  })
}
const parseWifiSpeedData = wifiSpeedJson => {
  Object.entries(wifiSpeedJson).forEach(([key, wifiData]) => {
    var wifiIP = wifiData['client']['ip']
    var timestamp = wifiData['timestamp']
    console.log('------------------> wifiIP', wifiIP)

    networkServices.addWifiSpeedToDB(wifiIP, wifiData, BUILDING, timestamp,
      (err, wifiData) => {
        if (err) {
          console.log("Could not add wifi data to DB ----->", err);
        }
        return (null, wifiData);
      })

  })
}


module.exports = {
  parseNetworkData,
  parseWifiSpeedData
}