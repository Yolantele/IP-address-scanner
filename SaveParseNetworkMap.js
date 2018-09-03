const yaml = require('yamljs');
const fs = require('fs');
var cron = require('node-cron');


const laptopLocation = `/Users/jolanta/Projects/2018/network-scanner/maps/`;
const rPiLocation = `/home/pi/trackerjacker/maps/`;

const PATH = laptopLocation

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
      parsedData[network] = devices
    }
    
  })
  parsedData.totalNetworksDevices = devicesAccrossNetworks
  parsedData.timeStamp = fs.statSync(PATH + mapName).birthtime
  parsedData.fileName = mapName
  // save data to db
  return parsedData
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