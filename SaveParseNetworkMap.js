const yaml = require('yamljs');
const fs = require('fs');
const cron = require('node-cron');
const networkServices = require('./services/networkServices')

// const laptopLocation = `/Users/jolanta/Projects/2018/network-scanner/maps/`;
// const rPiLocation = `/home/pi/trackerjacker/maps/`;

// const PATH = laptopLocation
const BUILDING = "Morelands, Jigsaw XYZ"

// converts YAML to stringified JSON:
const yamlToJson = mapName => {
  try {
    return yaml.parse(mapName.data);
  } catch (e) {
    console.log(e)
  }
}

//parses stgringified JSON into sanitized JSON obj:
const parseNetworkData = mapName => {
  console.log('----------> map comes in ')
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
    console.log('----------> successfully updated row with network devices data')
  })
}

// const readForParsing = fs.readdirSync(PATH).map(file => {
//   parseNetworkData(String(file));
// })


// // periodically runs these commands:
// cron.schedule('* * * * *', () => { // saves every minute
//   readForParsing
//   console.log(`-----------> PARSED THE MAP `)
// });



module.exports = {
  yamlToJson,
  parseNetworkData,
}