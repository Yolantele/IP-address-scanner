const yaml = require('yamljs');
const fs = require('fs');


const laptopLocation = `/Users/jolanta/Projects/2018/network-scanner/maps/`;
const rPiLocation = `/home/pi/trackerjacker/maps/`;

const PATH = laptopLocation

const yamlToJson = mapName => {
  try {
    return yaml.parse(fs.readFileSync( PATH + mapName, 'utf8'));
  } catch (e) {
    console.log(e)
  }
}


const parseNetworkData = mapName => {
  
  let devicesAccrossNetworks = 0
  let parsedData = {}
  var jsonMap = yamlToJson(mapName)
  
  // TODO: parse one map regularily
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

  const parseResult = fs.readdirSync(PATH).map(file => {
    return parseNetworkData(String(file));
  })

  
console.log(parseResult)


module.exports = {
  yamlToJson,
  parseNetworkData,
}