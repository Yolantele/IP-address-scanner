const yaml = require('yamljs');
const fs = require('fs');

const laptopLocation = `/Users/jolanta/Projects/2018/network-scanner/`;
const rPiLocation = `/home/pi/trackerjacker/`;

const PATH = rPiLocation

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

  return parsedData
}


const result = [
  parseNetworkData('wifi_map_30Aug_9am_JigsawBuilding.yaml'),
  parseNetworkData('wifi_map_30Aug_10am_JigsawBuilding.yaml'),
  parseNetworkData('wifi_map_30Aug_11am_JigsawBuilding.yaml'),
  parseNetworkData('wifi_map_30Aug_12pm_JigsawBuilding.yaml'),
  parseNetworkData('wifi_map_30Aug_2pm_JigsawBuilding.yaml'),
  parseNetworkData('wifi_map_30Aug_3pm_JigsawBuilding.yaml'),
  parseNetworkData('wifi_map_30Aug_4pm_JigsawBuilding.yaml'),
]

console.log(result)

module.exports = {
  yamlToJson,
  parseNetworkData
}