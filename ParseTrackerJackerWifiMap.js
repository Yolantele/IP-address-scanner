const yaml = require('yamljs');
const fs = require('fs');

// const laptopLocation = `/Users/jolanta/Projects/2018/network-scanner/${mapName}`;
// const rPiLocation = `home/pi/trackerjacker/${mapName}`;


const yamlToJson = mapName => {
  try {
    return yaml.parse(fs.readFileSync(`/Users/jolanta/Projects/2018/network-scanner/${mapName}`, 'utf8'));
  } catch (e) {
    console.log(e)
  }
}




const parseNetworkData = mapName => {

    let devicesAccrossNetworks = 0
    let snapshot = {}
    
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
            snapshot[network] = devices
        }
        
    })
    snapshot.totalNetworksDevices = devicesAccrossNetworks
    return snapshot
}


const result = [
  parseNetworkData('wifi_map_30Aug_9am_JigsawBuilding.yaml'),
  parseNetworkData('wifi_map_30Aug_10am_JigsawBuilding.yaml')
]

console.log(result)

module.exports = {
  yamlToJson,
  parseNetworkData
}