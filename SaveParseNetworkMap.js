const yaml = require('yamljs');
const fs = require('fs');
const cron = require('node-cron');
const networkServices = require('./services/networkServices')

const laptopLocation = `/Users/jolanta/Projects/2018/network-scanner/maps/`;
const rPiLocation = `/home/pi/trackerjacker/maps/`;

const PATH = laptopLocation
const BUILDING = "Morelands, Jigsaw XYZ"

// converts YAML to stringified JSON:
const yamlToJson = mapName => {
  try {
    return yaml.parse(fs.readFileSync( PATH + mapName, 'utf8'));
  } catch (e) {
    console.log(e)
  }
}

//parses stgringified JSON into sanitized JSON obj:
const parseNetworkData = mapName => {
  
  let devicesAccrossNetworks = 0
  let parsedData = {}
  var jsonMap = yamlToJson(mapName)
  
  Object.entries(jsonMap).forEach(([network, networkValue]) => {
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
      // parsedData[network] = devices
      networkServices.addNetworkDevicesToDB(network, devicesAccrossNetworks, BUILDING, 
        (err, networkData) => {
          if (err) {
            console.error("Could not add network data to DB");
          }
        return callback(null, networkData);
      })
    }
    
  })
  // parsedData.totalNetworksDevices = devicesAccrossNetworks
  // parsedData.timeStamp = fs.statSync(PATH + mapName).birthtime
  // parsedData.fileName = mapName
  // return parsedData
  console.log('----------> successfully updated rows of network data')
}

const readForParsing = fs.readdirSync(PATH).map(file => {
  return parseNetworkData(String(file));
})


// periodically runs these commands:
cron.schedule('* * * * *', () => { // saves every minute
  var counter = 1
  console.log(`-----------> JUST PARSED THE MAP FOR THE ${counter} TIME`)
  counter += 1
  console.log(readForParsing)
});



module.exports = {
  yamlToJson,
  parseNetworkData,
  readForParsing,
}